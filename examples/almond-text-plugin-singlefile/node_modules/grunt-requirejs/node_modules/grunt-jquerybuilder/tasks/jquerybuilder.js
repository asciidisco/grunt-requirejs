/*global require: true */

/*
 * grunt-jquerybuilder
 * https://github.com/asciidisco/grunt-jquerybuilder
 *
 * Copyright (c) 2012 asciidisco
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
  'use strict';

  // Internal lib
  var builder = require('../lib/builder').init(grunt);

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('jquery', 'Builds your custimized jquery experience', function(mode) {
    var done = this.async(),
        config = grunt.config.get('jquery');

    var fileWriter = function (transport, options) {
      // display error
      if (transport.type === 'error') {
        grunt.log.error(transport.content);
      }

      // proceed with file content
      if (transport.type === 'content') {
        grunt.log.write('Writing custom jQuery file');
        grunt.file.write(options.config.dest, transport.content);
      }

      options.done();
    };

    // execute clear target helper
    builder.build({
      config: config,
      done: done,
      debug: !!config.debug
    }, fileWriter);

  });

};