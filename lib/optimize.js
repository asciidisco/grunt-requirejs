/*global exports:true, require:true */

/*
 * grunt-require
 * https://github.com/asciidisco/grunt-requirejs
 *
 * Copyright (c) 2012 asciidisco
 * Licensed under the MIT license.
 */

(function () {
  'use strict';

  // External libs.
  var rjs = require('requirejs');
  var fs = require('fs');
  var _ = require('lodash');

  exports.init = function(grunt) {
    var exports = {};

    // Internal libs.
    var sizeInfo = require('./sizeInfo').init(grunt);

    // collect the content from the uncompressed files
    exports.uncompressedFilesContent = function (options, result, pathMap) {
      var files = result.split(/\r\n|\r|\n/);
      var fileContents = '';
      var pathMapKeys = Object.keys(pathMap);
      var parsedModules = [];

      // iterate over all modules to collect the uncompressed size
      files.forEach(function (name) {
        _.each(pathMapKeys, function (key) {
          if (key.search(name) !== -1 && name !== '' && !parsedModules[name]) {
            fileContents += pathMap[key];
          }
        });
      });

      return fileContents;
    };

    exports.optimize = function (options) {
      var onBuildWrite = null;
      var onBuildRead = null;
      var hybridBuilds = false;
      var moduleCount = 0;
      var pathMap = {};

      // check if we have a user set onBuildWrite config option
      // if so, store locally
      if (options.config.onBuildWrite) {
        onBuildWrite = options.config.onBuildWrite;
      }

      // check if we have a user set onBuildRead config option
      // if so, store locally
      if (options.config.onBuildRead) {
        onBuildRead = options.config.onBuildRead;
      }

      // override the oldOnBuildRead to collect the single file contents
      options.config.onBuildRead = function (moduleName, path, contents) {
        pathMap[path] = contents;

        // call old onBuildRead if defined
        if (onBuildRead !== null) {
          return onBuildRead(moduleName, path, contents);
        }

        return contents;
      };

      // check if we have a defined '__builderOutput'
      if (options.config.__builderOutput) {
        // overwrite onBuildRead
        options.config.onBuildWrite = function (moduleName, path, contents) {
          // walk through all defined prebuild output modules
          options.config.__builderOutput.forEach(function (module, idx) {
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
      if (options.config.optimize === 'hybrid') {
        hybridBuilds = true;
        options.config.optimize = 'uglify';
      }

      var statsGenerator = function (module, result) {
        try {
          // Query the entry
          var stats = fs.lstatSync(module._buildPath);

          // Is it a file ?!
          if (stats.isFile()) {
            sizeInfo.info(module.name, (options.config.optimize !== 'none' ? true : false), grunt.file.read(module._buildPath, 'utf-8'), exports.uncompressedFilesContent(options, result, pathMap));
          }
        } catch (e) {
          grunt.fail.warn('File not found for module: ' + module.name);
        }
      };

      /*options.done = function () {
        console.log('done called', arguments);
      };*/

      var finishOptimizer = function () {
        // check for callback, else mark as done
        if (grunt.utils._.isFunction(options.cb)) {
          options.cb();
        } else {
          options.done();
        }
      };

      // call rjs optimizer
      rjs.optimize(options.config, function (result) {
        // check if verbose flag is set, then log result
        grunt.verbose.write(result);

        // log process end
        grunt.log.writeln('RequireJS optimizer finished');

        // display sizes of modules
        if (grunt.utils._.isArray(options.config.modules) && options.config.dir) {
          var modulesResolved = 0;
          moduleCount = options.config.modules.length;
          options.config.modules.forEach(function (module, idx) {

            // check if we should execute a hybrid build
            if (hybridBuilds === true) {
              grunt.verbose.writeln('Hybrid build running: Closure Compiler');

              grunt.utils.spawn({
                cmd: 'java',
                args: ['-jar', require.resolve('grunt-lodashbuilder').replace('grunt.js', 'node_modules/lodash/vendor/closure-compiler/compiler.jar'), '--js', module._buildPath]
              }, function (error, out, code) {
                var closureCode = out.stdout;
                var uglifyCode = grunt.file.read(module._buildPath);
                var uglifyLength = uglifyCode.length;
                var closureLength = closureCode.length;

                if (closureLength < uglifyLength) {
                  grunt.file.write(module._buildPath, closureCode);
                }

                modulesResolved++;
                statsGenerator(module, result);

                if (modulesResolved === moduleCount) {
                  finishOptimizer();
                }
              });

            } else {
              statsGenerator(module, result);
              finishOptimizer();
            }

          });
        } else {
          finishOptimizer();
        }

      });

    };

    return exports;
  };

}).call(this);