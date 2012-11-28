module.exports = function(grunt) {
  'use strict';

  // load the modules tasks itself
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    clean: {
      examples: [
        '/examples/libglobal/dist/',
        '/examples/multipage/www-built/',
        '/examples/multipage-shim/www-built/'
      ]
    },

    test: {
      files: ['test/**/*.js']
    },

    qunit: {
      files: ['examples/**/tests/*.html']
    },

    lint: {
      files: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js', 'lib/**/*.js']
    },

    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {
        exports: true,
        require: true,
        module: true
      }
    }
  });

  // build all the projects from the ´examples´ folder
  // to run some tests against them
  grunt.registerTask('setUp', function () {
    var done = this.async(),
        preparation = [false, false, false],
        checkForPreparation = function () {
          if (grunt.utils._.all(preparation, grunt.utils._.identity)) {
            grunt.log.ok('all examples build');
            done();
          }
        };

    // build libglobal example
    grunt.utils.spawn({
      cmd: 'grunt',
      args: ['build'],
      opts: {cwd: 'examples/libglobal'}
    }, function () {
      grunt.log.writeln('> "libglobal" example build');
      preparation[0] = true;
      checkForPreparation();
    });

    // build multipage example
    grunt.utils.spawn({
      cmd: 'grunt',
      args: ['build'],
      opts: {cwd: 'examples/multipage'}
    }, function () {
      grunt.log.writeln('> "multipage" example build');
      preparation[1] = true;
      checkForPreparation();
    });

    // build multipage-shim example
    grunt.utils.spawn({
      cmd: 'grunt',
      args: ['build'],
      opts: {cwd: 'examples/multipage-shim'}
    }, function () {
      grunt.log.writeln('> "multipage-shim" example build');
      preparation[2] = true;
      checkForPreparation();
    });

  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'setUp lint test qunit clean:examples');

  // TravisCI task.
  grunt.registerTask('travis', 'setUp lint test qunit  clean:examples');
};
