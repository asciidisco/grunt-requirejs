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
  var fs = require('fs');
  // TODO: ditch this when grunt 0.4.0 is out
  var util = grunt.util;

  // Prepare the auto insertion of the almond library
  // by modifying the users config
  return function(config) {
    var configClone = util._.clone(config);
    var moduleIterator = configClone.modules;

    // check if we should inline almond
    if (config.almond === true) {

      // log that we´re including almond
      grunt.verbose.writeln('Including almond.js');

      // prepare the paths object (in case it hasn´t been set yet)
      configClone.paths = configClone.paths || {};

      // set almond path
      configClone.paths.almond = require.resolve('almond').replace('.js', '');

      // check if the 'removeCombined' option is enabled
      // then use a temporary almond file to ensure that the
      // almond.js source file doesn´t get deleted
      if (config.removeCombined === true) {
        configClone.__origAlmond = String(fs.readFileSync(configClone.paths.almond + '.js'));
      }

      // modify modules data
      if (!util._.isArray(moduleIterator)) {
        moduleIterator = [{name: config.name}];

        if (!util._.isArray(configClone.include)) {
          configClone.include = [configClone.name];
        } else {
          configClone.include.unshift(configClone.name);
        }

        configClone.name = 'almond';
      }

      // modify modules data
      moduleIterator.forEach(function(module, idx) {
        // log adding of almond to a specific module
        grunt.verbose.writeln('Adding almond to module: ' + module.name);

        // check if the module has its own includes
        // then append almond to them
        // else generate a new includes property
        if (util._.isArray(module.include)) {
          configClone.modules[idx].include.unshift('almond');
        } else {
          if (!util._.isUndefined(configClone.modules)) {
            configClone.modules[idx].include = ['almond'];
          }
        }

      });

    }

    return configClone;
  };
};
