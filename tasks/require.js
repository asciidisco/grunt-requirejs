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
  // requirejs optimizer
  var rjs = require('requirejs');
  var fs = require('fs');
  var wrench = require('wrench');


  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('requirejs', 'Runs requirejs optimizer', function() {
    var done = this.async(),
        optimize = function () {
          // run the optimizer
          grunt.helper('optimize', {
              config: config.get('requirejs'),
              done: function(err) {
                  done();
              }
          });
        }

    // log process start
    log.writeln('>> RequireJS optimizer startet');

    // check if we should clear the build directory
    if (config.get('requirejs').clearTarget === true) {
      grunt.helper('clearTarget', {
        config: config.get('requirejs'),
        cb: optimize
      })
    } else {
      optimize();
    }
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  // helper to execute requirejs optimizer function
  grunt.registerHelper('optimize', function(options) {
    rjs.optimize(options.config, function (result) {
      // check if verbose flag is set, then log result
      if (verbose === true) {
        log.writeln(result);
      }

      // log process end
      log.writeln('>> RequireJS optimizer finished');

      options.done();
    });
  });

  // helper to clean the build target directory
  grunt.registerHelper('clearTarget', function (options) {
    // log clear target function
    log.writeln('>> Clear target directory');
    wrench.rmdirSyncRecursive(options.config.dir, true);
    fs.mkdirSync(options.config.dir);
    options.cb();
    return true;
  });

};