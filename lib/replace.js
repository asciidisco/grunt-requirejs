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
  var cheerio = require('cheerio');

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
      files.forEach(function (file) {
        // load file contents
        var contents = String(grunt.file.read(file, 'utf-8'));
        // reference to script regex https://github.com/jquery/jquery/blob/1.7.2/src/ajax.js#L14
        var script_re = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            matches = contents.match(script_re);

        [].slice.call(matches).forEach(function(match, i){
          var $ = cheerio.load(match),
              elm = $('script');
          if (elm.attr('data-main')){
            var insertScript = (file.modulePath || elm.attr('data-main'));
            elm.attr('src', insertScript + '.js');
            elm.removeAttr('data-main');
            // replace i'th occurrence in content
            var j = 0;
            contents = contents.replace(script_re, function(match){
              j++;
              return (j-1 === i) ? $.html() : match;
            });
          }
        });

        grunt.log.writeln('Updating requirejs script tag for file', file);
        grunt.file.write(file, contents);
        // only resolve after all files have been evaluated
        filesEvaluated++;
        if (filesEvaluated >= files.length) {
          deferred.resolve(config);
        }

      });
    });

    return deferred.promise;
  };
};
