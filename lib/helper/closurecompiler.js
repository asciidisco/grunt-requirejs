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
  var fs =  require('fs');
  // TODO: ditch this when grunt 0.4.0 is out
  var util = grunt.util;

  return function(options, cb) {
    var closurecompilerpath = require.resolve('grunt-lodashbuilder').replace('Gruntfile.js', 'node_modules/lodash/vendor/closure-compiler/compiler.jar');

    if (fs.existsSync(closurecompilerpath)) {
      util.spawn({
        cmd: 'java',
        args: ['-jar', closurecompilerpath, '--js', options.buildPath]
      }, cb);
    } else {
      throw new Error('Closure compiler can not be found!');
    }

  };
};
