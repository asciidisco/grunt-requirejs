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
  var cheerio = require('cheerio');
  var domino = require('domino');
  var Q = require('q');
  // TODO: ditch this when grunt 0.4.0 is out
  var util = grunt.util;

  return function(config) {
    var deferred = Q.defer();

    // check if we should replace require with almond in html files
    if (config.almond === true && util._.isArray(config.replaceRequireScript)) {

      // iterate over all modules that are configured for replacement
      config.replaceRequireScript.forEach(function (entry, idx) {
        var files = grunt.file.expand(entry.files);
        // log almond including
        grunt.verbose.writeln('Replacing require script calls, with almond module files');

        // iterate over found html files
        files.forEach(function (file, index) {
          // load file contents
          var contents = String(grunt.file.read(file, 'utf-8'));
          var window = domino.createWindow(contents);
          var document = window.document;
          // get the doctype back
          var getDoctype = function (document) {
            var html = '';
            var node = document.doctype;

            if (node) {
                html = "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            }

            return html;
          };

          // iterate over content nodes to find the correct script tags
          var scriptTags = document.getElementsByTagName('script');
          util._.each(scriptTags, function (elm, idx) {

            // check for require js like script tags
            if (elm.tagName.toLowerCase() === 'script' && elm.getAttribute('data-main') !== null) {
              // replace the attributes of requires script tag
              // with the 'almonded' version of the module
              var insertScript = util._.isUndefined(entry.modulePath) !== true ? entry.modulePath : elm.getAttribute('data-main');
              elm.setAttribute('src', insertScript + '.js');
              elm.removeAttribute('data-main');
            }

          });

          // write out newly created file contents
          grunt.file.write(file, getDoctype(document) + document.documentElement.outerHTML);
          deferred.resolve(config);
        });
      });


      return deferred.promise;
    }

    return config;
  };
};
