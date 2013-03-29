/*
 * grunt-require
 * https://github.com/asciidisco/grunt-requirejs
 *
 * Copyright (c) 2012 asciidisco
 * Licensed under the MIT license.
 */

exports.init = function(grunt) {
  'use strict';

  // External libs.
  var fs = require('fs');
  var gzip = require('gzip-js');
  // TODO: ditch this when grunt 0.4.0 is out
  var util = grunt.util;
  var exports = {};

  // Return gzipped source.
  exports.gzip = function(src) {
    return src ? gzip.zip(src, {}) : '';
  };

  // Collect & output some size info about a file
  exports.info = function(module, optimized, filecontents, uncompressed, silent) {
    var gzipSize = String(exports.gzip(filecontents).length);
    var optFileSize = String(filecontents.length);
    var fileSize = String((!uncompressed) ? optFileSize : uncompressed.length);
    var messageUncompressed = 'Uncompressed size: ' + fileSize.green + ' bytes.';
    var messageCompressed = 'Compressed size: ' + gzipSize.green + ' bytes gzipped.' + (optimized !== false ? ' (' + optFileSize.green + ' bytes minified)' : '');

    // check if output is muted
    if (silent !== true) {
      grunt.log.writeln('\n' + module.underline);
      grunt.log.writeln(messageUncompressed);
      grunt.log.writeln(messageCompressed);
    }

    // return traced informations
    return {module: module, gzipSize: gzipSize, fileSize: fileSize, optFileSize: optFileSize, messageUncompressed: messageUncompressed, messageCompressed: messageCompressed};
  };

  // Collect the uncompressed modules file contents
  exports.uncompressedFilesContent = function(result, pathMap) {
    // split the requirejs result by its newlines
    // to have a proper source file map
    var files = result.split(/\r\n|\r|\n/);
    var fileContents = '';
    var pathMapKeys = Object.keys(pathMap);
    var parsedModules = [];

    // iterate over all modules to collect the uncompressed size
    files.forEach(function (name) {
      util._.each(pathMapKeys, function (key) {
        // check if we havent processed the module yet
        if (key.search(name) !== -1 && name !== '' && !parsedModules[name]) {
          fileContents += pathMap[key];
        }
      });
    });

    return fileContents;
  };

  // Computes the uncompressed, compressed & gzipped file sizes
  exports.statsGenerator = function (module, result, config, pathMap) {
    if (fs.existsSync(module._buildPath)) {
        exports.info(module.name, (config.optimize !== 'none' ? true : false), grunt.file.read(module._buildPath), this.uncompressedFilesContent(result, pathMap), false);
    } else {
      if (fs.existsSync(module)) {
        exports.info(module, (config.optimize !== 'none' ? true : false), grunt.file.read(module), this.uncompressedFilesContent(result, pathMap), false);
      } else {
        grunt.fail.warn('File not found for module: ' + module.name);
      }
    }
  };

  return exports;
};
