/*
 * grunt-requirejs
 * https://github.com/asciidisco/grunt-requirejs
 *
 * Copyright (c) 2012 Sebastian Golasch, contributors
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  // fail task & log the error
  return function(error) {
    grunt.log.error(error);
    // this.done referres to grunts ´async´ method
    this.done(false);
  };

};
