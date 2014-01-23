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
  var Q = require('q');
  var jsdom = require('jsdom');
  var fs = require('fs');
  var rBody = /<body>/;

  return function(config) {
    var deferred = Q.defer();

    // exit early if we're not replacing scripts
    if(!(config.replaceRequireScript instanceof Array) || !config.replaceRequireScript.length) {
      return config;
    }

    // iterate over all modules that are configured for replacement
    config.replaceRequireScript.forEach(function (file, idx) {
      var files = grunt.file.expand(file.files);
      var filesEvaluated = 0;

      // iterate over found html files
      files.forEach(function(file) {
        var fileContents = fs.readFileSync(file, 'utf-8');
        var hasBody = rBody.test(fileContents);

        jsdom.env(fileContents, {
          FetchExternalResources: false,
          ProcessExternalResources: false
        }, function(err, window) {
          var scripts = window.document.querySelectorAll('script[data-main]');

          [].slice.call(scripts).forEach(function(script) {
            var insertScript = (file.modulePath || script.getAttribute('data-main'));
            script.src = insertScript + '.js';
            script.removeAttribute('data-main');
          });

          var html = hasBody ? window.document.innerHTML : window.document.body.innerHTML;
          grunt.log.writeln('Updating requirejs script tag for file', file);
          grunt.file.write(file, html);

          // only resolve after all files have been evaluated
          filesEvaluated++;
          if (filesEvaluated >= files.length) {
            deferred.resolve(config);
          }
        });
      });
    });

    return deferred.promise;
  };
};

