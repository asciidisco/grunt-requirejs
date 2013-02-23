/*
 * grunt-requirejs
 * https://github.com/asciidisco/grunt-requirejs
 *
 * Copyright (c) 2012 Sebastian Golasch, contributors
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
  'use strict';

  // External libs.
  var Q = require('q');

  // Path to internal libs
  var intLibPath = '../lib/';

  // Internal libs.
  var errorHandler = require(intLibPath + 'helper/errorhandler')(grunt);
  var optimize = require(intLibPath + 'optimize').init(grunt);
  var almondify = require(intLibPath + 'almondify').init(grunt);
  var replaceAlmondInHtmlFiles = require(intLibPath + 'replace').init(grunt);
  var lodashCustomBuilder = require(intLibPath + 'custombuilder/lodash').init(grunt);
  var jqueryCustomBuilder = require(intLibPath + 'custombuilder/jquery').init(grunt);
  var backboneCustomBuilder = require(intLibPath + 'custombuilder/backbone').init(grunt);

  // requirejs Multitask
  // runs a promises chain of helper libraries
  // the order of the helper libraries is important
  // each helper runs independent & has no dependencies on the other helpers
  grunt.registerMultiTask('requirejs', 'Runs requirejs optimizer', function() {
    var done = this.async();

    // The functions only accept the plugin
    // config as a parameter & only return the config.
    // The functions might modify the config during
    // the run or add arbitary data.
    // Calls ´done´ when all chain is comletely executed
    // Calls the ´errorhandler if an error occures during the build
    Q.fcall(lodashCustomBuilder, this.options())
      .then(jqueryCustomBuilder)
      .then(backboneCustomBuilder)
      .then(almondify)
      .then(optimize)
      .then(replaceAlmondInHtmlFiles)
      .then(this.data.cb || function () {})
      .fail(errorHandler.bind({done: done}))
      .fin(done)
      .done();

  });

};
