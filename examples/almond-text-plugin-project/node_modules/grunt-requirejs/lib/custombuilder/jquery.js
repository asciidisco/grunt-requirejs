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

  // Generates a custom jQuery build
  return function(config) {
    // load the jQuery builder helper library
    var jquerybuilder = require(require.resolve('grunt-jquerybuilder').replace('grunt.js', '').replace('Gruntfile.js', '') + '/lib/builder.js');
    var jquery = jquerybuilder.init(grunt);

    // check if the jQuery builder config is set
    if (config.builder && config.builder.jquery) {
      // Return a deferred object (´jquery.build´ is async)
      var deferred = Q.defer();

      // Log task description in verbose mode
      grunt.verbose.writeln('Running jQuery custom build');

      // call the custom build helper with the builder specific config
      // the custom builder returns an ´transport´ object that has two
      // public members ´type´ and ´content´
      // ´type´ can be 'error' or 'content'
      // if the ´type´ is 'error' ´content´ contains the error message
      // else ´content´ contains the custom library contents
      jquery.build({config: config.builder.jquery}, function(transport) {

        // check if an error occured during the
        // custom build generation, then fail
        if (transport.type === 'error') {
          deferred.reject(transport.content);
        }

        // proceed with file content
        if (transport.type === 'content') {

          // check & prepare builder output config property
          config.__builderOutput = config.__builderOutput || [];

          // add the generated content to the
          // custom ´__builderOutput´ config entry
          config.__builderOutput.push({
            name: 'jquery',
            alias: (config.builder.jquery.alias ? config.builder.jquery.alias : 'jquery'),
            content: transport.content
          });

          // resolve the deferred & return the modified config object
          deferred.resolve(config);
        }

      });

      return deferred.promise;
    }

    return config;
  };
};