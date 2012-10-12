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
  var gzip = require('gzip-js');

  exports.init = function(grunt) {
    var exports = {};

    // Return gzipped source.
    exports.gzip = function(src) {
      return src ? gzip.zip(src, {}) : '';
    };

    // Collect & output some size info about a file
    exports.info = function(module, optimized, filecontents, uncompressed, silent) {
      var gzipSize = String(exports.gzip(filecontents).length),
          optFileSize = String(filecontents.length),
          fileSize = String((!uncompressed) ? optFileSize : uncompressed.length),
          messageUncompressed = 'Uncompressed size: ' + fileSize.green + ' bytes.',
          messageCompressed = 'Compressed size: ' + gzipSize.green + ' bytes gzipped.' + (optimized !== false ? ' (' + optFileSize.green + ' bytes minified)' : '');

      // check if output is muted
      if (silent !== true) {
        grunt.log.writeln(messageUncompressed);
        grunt.log.writeln(messageCompressed);
      }

      // return traced informations
      return {module: module, gzipSize: gzipSize, fileSize: fileSize, optFileSize: optFileSize, messageUncompressed: messageUncompressed, messageCompressed: messageCompressed};
    };

    return exports;
  };

}).call(this);