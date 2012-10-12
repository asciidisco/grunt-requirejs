/*global require: true */

/*
 * grunt-require
 * https://github.com/asciidisco/grunt-requirejs
 *
 * Copyright (c) 2012 asciidisco
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
  'use strict';

  // Internal lib
  var optimize = require('../lib/optimize').init(grunt);
  var almondify = require('../lib/almondify').init(grunt);
  var replace = require('../lib/replace').init(grunt);
  var lodash = require('../lib/lodash').init(grunt);

  // ==========================================================================
  // PRIVATE HELPER FUNCTIONS
  // ==========================================================================

  var Helper = {};

  // runs the require js optimizer
  Helper.optimize = function (config, done, cb) {
    return function (chgConfig) {
        optimize.optimize({
            config: typeof chgConfig === 'undefined' ? config : chgConfig,
            done: done,
            cb: cb
        });
    };
  };

  // runs the almond js html file replacement
  Helper.replaceAlmond = function (config, done, cb) {
    return function (chgConfig) {
        replace.replace({
            config: typeof chgConfig === 'undefined' ? config : chgConfig,
            done: done,
            cb: cb
        });
    };
  };

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('requirejs', 'Runs requirejs optimizer', function(mode) {
    var done = this.async(),
        config = this.data;

    // execute lodash checker helper
    lodash.lodashify({
      config: config,
      done: done,
      cb: almondify.almondify,
      Helper: Helper
    });

    //return done;
  });

};