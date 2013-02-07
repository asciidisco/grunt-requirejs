/*global exports:true, require:true */

/*
 * grunt-jquerybuilder
 * https://github.com/asciidisco/grunt-jquerybuilder
 *
 * Copyright (c) 2012 asciidisco
 * Licensed under the MIT license.
 */

(function () {
  'use strict';

  // External libs.
  var builder = require('jquery-builder');

  exports.init = function(grunt) {
    var exports = {};
    var Transport = function (type, content) {
      this.type = type;
      this.content = content;
    };

    // spawns the lodash build process
    exports.build = function (options, contentCb) {

      builder(options.config.exclude, options.config.version || '1.8.3', typeof options.config.minify === 'undefined' ? false : options.config.minify , function (err, buffer) {
        if (err) {
          contentCb(new Transport('error', 'No output'), options);
        } else {
          contentCb(new Transport('content', String(buffer)), options);
        }
      });

    };

    return exports;
  };

}).call(this);