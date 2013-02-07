/*
 * grunt-require
 * https://github.com/asciidisco/grunt-requirejs
 *
 * Copyright (c) 2012 asciidisco
 * Licensed under the MIT license.
 */

exports.init = function(grunt) {
  'use strict';

  var fs = require('fs');
  var exports = {};

  // privates
  var isDefaultVersion = true;
  var requirejs = null;

  // Returns a requirejs instance
  exports.getRequirejs = function(config) {
    var defaultRequire = require('requirejs');

    // check if we should load a custom requirejs version
    if (config.rjs) {
      var rjsPathname = config.rjs + '/bin/r.js';

      // check if the custom version is available, then load & return the
      // custom version, else default to the standard bundled requirejs
      if (fs.existsSync(rjsPathname)) {
        requirejs = require(rjsPathname);
        isDefaultVersion = false;
        return requirejs;
      }

    }

    isDefaultVersion = true;
    requirejs = defaultRequire;
    return requirejs;
  };

  // Returns the version number of the currently used requirejs library
  exports.getRequirejsVersionInfo = function() {
    return requirejs.version;
  };

  // Returns a boolean flag that determines if we´re using
  // the default bundled version or a user defined custom requirejs version
  exports.isCustomLibrary = function() {
    return !isDefaultVersion;
  };

  return exports;
};
