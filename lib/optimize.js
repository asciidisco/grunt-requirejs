/*
 * grunt-requirejs
 * https://github.com/asciidisco/grunt-requirejs
 *
 * Copyright (c) 2012 Sebastian Golasch, contributors
 * Licensed under the MIT license.
 */

exports.init = function(grunt) {
  'use strict';

  // External libs.
  var Q = require('q');
  var fs = require('fs');
  // TODO: ditch this when grunt 0.4.0 is out
  var util = grunt.utils || grunt.util;

  // Internal libs.
  var sizeInfo = require('./helper/sizeInfo').init(grunt);
  var rjsversion = require('./helper/rjsversion').init(grunt);

  // Private helper functions

  // Collect the uncompressed modules file contents
  var uncompressedFilesContent = function(result, pathMap) {
    // split the requirejs result by its newlines
    // to have a proper source file map
    var files = result.split(/\r\n|\r|\n/);
    var fileContents = '';
    var pathMapKeys = Object.keys(pathMap);
    var parsedModules = [];

    // iterate over all modules to collect the uncompressed size
    files.forEach(function (name) {
      util._.each(pathMapKeys, function (key) {
        // check if we havent processed the module yet
        if (key.search(name) !== -1 && name !== '' && !parsedModules[name]) {
          fileContents += pathMap[key];
        }
      });
    });

    return fileContents;
  };

  // Computes the uncompressed, compressed & gzipped file sizes
  var statsGenerator = function (module, result, config, pathMap) {
    if (fs.existsSync(module._buildPath)) {
        sizeInfo.info(module.name, (config.optimize !== 'none' ? true : false), grunt.file.read(module._buildPath, 'utf-8'), uncompressedFilesContent(result, pathMap));
    } else {
      grunt.fail.warn('File not found for module: ' + module.name);
    }
  };

  // Runs the requirejs optimizer
  // collects the fileSizes (before & after optimization)
  // is capable of running so called 'hybrid' build (e.g. running both - uglify & closure compiler)
  return function(config) {
    var exports = {};
    var deferred = Q.defer();
    var onBuildWrite = null;
    var onBuildRead = null;
    var hybridBuilds = false;
    var pathMap = {};

    // load the requirejs optimizer
    var rjs = rjsversion.getRequirejs(config);

    // check if we have a user set onBuildWrite config option
    // if so, store locally
    if (config.onBuildWrite) {
      onBuildWrite = options.config.onBuildWrite;
    }

    // check if we have a user set onBuildRead config option
    // if so, store locally
    if (config.onBuildRead) {
      onBuildRead = options.config.onBuildRead;
    }

    // override the oldOnBuildRead to collect the single file contents
    // so we can generate file size stats later on
    config.onBuildRead = function (moduleName, path, contents) {
      // grab the file contents
      pathMap[path] = contents;

      // call old onBuildRead if defined
      if (onBuildRead !== null) {
        return onBuildRead(moduleName, path, contents);
      }

      return contents;
    };

    // check if we have a defined '__builderOutput'
    // which means we have to replace original file contents
    // with their custom build equivalents
    if (config.__builderOutput) {
      config.onBuildWrite = function (moduleName, path, contents) {
        // walk through all defined custom build modules
        config.__builderOutput.forEach(function (module, idx) {
          if (module.alias === moduleName) {
            contents = module.content;
          }
        });

        // call old onBuildWrite if defined
        if (onBuildWrite !== null) {
          return onBuildWrite(moduleName, path, contents);
        }

        return contents;
      };
    }

    // check if we should do hybrid builds
    if (config.optimize === 'hybrid') {
      hybridBuilds = true;
      // reset the optimizer to ´uglify´ so that we can apply
      // the closure compiler later on manually
      config.optimize = 'uglify';
    }

    // call the requirejs optimizer
    rjs.optimize(config, function(result) {
      // log the original requirejs builder output
      grunt.verbose.write(result);

      // log requirejs optimizer process ended
      grunt.log.ok('RequireJS optimizer finished');

      // display sizes of modules
      if (util._.isArray(config.modules) && config.dir) {
        var modulesResolved = 0;
        var moduleCount = config.modules.length;

        // iterate over all defined modules
        config.modules.forEach(function(module, idx) {
          // check if we should execute a hybrid build
          if (hybridBuilds === true) {
            // log that we´re now running the hybrid build option
            grunt.verbose.writeln('Hybrid build running: Closure Compiler');

            // TODO: Get user defined closure compiler options in
            util.spawn({
              cmd: 'java',
              args: ['-jar', require.resolve('grunt-lodashbuilder').replace('grunt.js', 'node_modules/lodash/vendor/closure-compiler/compiler.jar'), '--js', module._buildPath]
            }, function (error, out, code) {
              // get the closure compiler output from stdout
              var closureCode = out.stdout;

              // read the uglyfied file outputs, put together by the rjs optimizer
              var uglifyCode = grunt.file.read(module._buildPath);

              // collect the lengths of the uglify & closure compiler output
              var uglifyLength = uglifyCode.length;
              var closureLength = closureCode.length;

              // overwrite the originally created uglified file with the
              // result of the hybrid build if it is smaller
              if (closureLength < uglifyLength) {
                grunt.file.write(module._buildPath, closureCode);
              }

              // update stats for the processed modules
              modulesResolved++;
              statsGenerator(module, result, config, pathMap);

              // check if all modules have been processed, then
              // resolve the deferred
              if (modulesResolved === moduleCount) {
                deferred.resolve(config);
              }
            });
          } else {
            statsGenerator(module, result, config, pathMap);
            deferred.resolve(config);
          }

        });
      } else {
        deferred.resolve(config);
      }

    });

    return deferred.promise;
  };
};