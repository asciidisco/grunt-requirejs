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

  exports.init = function(grunt) {
    var exports = {};

    exports.almondify = function (options) {
      var configClone = grunt.utils._.clone(options.config),
          moduleIterator = configClone.modules;

      // check if we should inline almond
      if (options.config.almond === true) {

          // log almond including
          grunt.log.writeln('Including almond.js');

          // set almond path
          configClone.paths.almond = require.resolve('almond').replace('.js', '');

          // modify modules data
          if (!grunt.utils._.isArray(moduleIterator)) {
            moduleIterator = [{name: options.config.name}];

            if (!grunt.utils._.isArray(configClone.include)) {
              configClone.include = [configClone.name];
            } else {
              configClone.include.unshift(configClone.name);
            }

            configClone.name = 'almond';
          }

          // modify modules data
          moduleIterator.forEach(function (module, idx) {
            // log adding of almond
            grunt.verbose.ok('Adding almond to module: ' + module.name);

            // check if the module has its own includes
            // then append almond to them
            // else generate a new includes property
            if (grunt.utils._.isArray(module.include) === true) {
              configClone.modules[idx].include.unshift(configClone.modules[idx].name);
              configClone.modules[idx].name = 'almond';
            } else {
              if (!grunt.utils._.isUndefined(configClone.modules)) {
                configClone.modules[idx].include = ['almond'];
              }
            }

          });

      }

      // check for callback, else mark as done
      if (grunt.utils._.isFunction(options.cb)) {
        options.cb(configClone);
      } else {
        options.done();
      }
    };

    return exports;
  };

}).call(this);