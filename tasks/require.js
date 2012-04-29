/*
 * grunt-require
 * https://github.com/asciidisco/grunt-requirejs
 *
 * Copyright (c) 2012 asciidisco
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  // Grunt utilities.
  var task = grunt.task;
  var file = grunt.file;
  var utils = grunt.utils;
  var log = grunt.log;
  var verbose = grunt.verbose;
  var fail = grunt.fail;
  var option = grunt.option;
  var config = grunt.config;
  var template = grunt.template;

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('require', 'Your task description goes here.', function() {
    log.write(grunt.helper('require'));
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('require', function() {
    var requireConfig = config.get('build');
    var fs = require('fs');
    var done = this.async();

    // use require js to regenerate
    grunt.utils.spawn({
      cmd: './node_modules/r.js/bin/r.js',
      args: ['-o', requireConfig.requireFile]
    }, function  (err, stdout, stderr) {
      grunt.log.write(stdout.stdout);
      // All done!
      done();
    });

    return done;
  });

};
