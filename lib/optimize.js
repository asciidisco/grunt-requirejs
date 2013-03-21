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
  var util = grunt.util;

  // Internal libs.
  var sizeInfo = require('./helper/sizeInfo').init(grunt);
  var rjsversion = require('./helper/rjsversion').init(grunt);
  var closurecompiler = require('./helper/closurecompiler').init(grunt);

  // Runs the requirejs optimizer
  // collects the fileSizes (before & after optimization)
  // is capable of running so called 'hybrid' build (e.g. running both - uglify & closure compiler)
  return function xxx(config) {
    var deferred = Q.defer();
    var hybridBuilds = false;
    var pathMap = {};

    // load the requirejs optimizer
    var rjs = rjsversion.getRequirejs(config);

    // check if we have a user set onBuildWrite config option
    // if so, store locally
    if (config.onBuildWrite) {
      var onBuildWrite = config.onBuildWrite;
    }

    // check if we have a user set onBuildRead config option
    // if so, store locally
    if (config.onBuildRead) {
      var onBuildRead = config.onBuildRead;
    }

    // override the oldOnBuildRead to collect the single file contents
    // so we can generate file size stats later on
    config.onBuildRead = function (moduleName, path, contents) {
      // grab the file contents
      pathMap[path] = contents;

      // call old onBuildRead if defined
      if (onBuildRead) {
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
        if (onBuildWrite) {
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

      // check if we need to replace the original almond file with our temp contents
      if (config.__origAlmond) {
        fs.writeFileSync(config.paths.almond + '.js', config.__origAlmond);
      }

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
            closurecompiler({buildPath: module._buildPath}, function (error, out, code) {
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
              sizeInfo.statsGenerator(module, result, config, pathMap);

              // check if all modules have been processed, then
              // resolve the deferred
              if (modulesResolved === moduleCount) {
                deferred.resolve(config);
              }
            });
          } else {
            sizeInfo.statsGenerator(module, result, config, pathMap);
            deferred.resolve(config);
          }

        });
      } else {
        if (config.out) {
          sizeInfo.statsGenerator(config.out, result, config, pathMap);
        }
        deferred.resolve(config);
      }

    }, function(error) {
        deferred.reject(error);
    });

    return deferred.promise;
  };
};
