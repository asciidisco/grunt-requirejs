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

  // Runs the requirejs optimizer
  // collects the fileSizes (before & after optimization)
  return function xxx(config) {
    var deferred = Q.defer();
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
        config.modules.forEach(function(module) {
          sizeInfo.statsGenerator(module, result, config, pathMap);
          deferred.resolve(config);
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
