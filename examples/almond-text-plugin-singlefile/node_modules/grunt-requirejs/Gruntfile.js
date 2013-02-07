module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    clean: {
      examples: [
        '/examples/libglobal/dist/',
        '/examples/libglobal-hybrid/dist/',
        '/examples/multipage/www-built/',
        '/examples/multipage-shim/www-built/'
      ],
      tmp: ['tmp']
    },

    copy: {
      dist: {
        files: {
          'tmp/doNotKillAlmond/': 'test/fixtures/*.js'
        }
      }
    },

    // Configuration to be run (and then tested).
    requirejs: {
      compile: {
        options: {
          baseUrl: 'test/fixtures',
          name: 'project',
          out: 'tmp/requirejs.js'
        }
      },
      rmCombined: {
        options: {
          baseUrl: 'tmp/doNotKillAlmond',
          name: 'project',
          out: 'tmp/requirejs-killed.js',
          almond: true,
          removeCombined: true
        }
      },
      template: {
        options: {
          baseUrl: 'test/fixtures',
          name: 'project',
          out: 'tmp/requirejs-template.js'
        }
      },
      sourcemaps: {
        options: {
          baseUrl: 'test/fixtures',
          name: 'project',
          out: 'tmp/requirejs-sourcemaps.js',
          optimize: "uglify2",
          generateSourceMaps: true,
          preserveLicenseComments: false,
          useSourceUrl: true
        }
      }
    },

    nodeunit: {
      all: ['test/*_test.js']
    },

    qunit: {
      options: {
        timeout: 20000
      },
      all: ['examples/**/tests/*.html']
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
        es5: true,
        globals: {
          exports: true,
          require: true,
          module: true
        },
      },
      all: ['grunt.js', 'tasks/**/*.js', 'test/require_test.js', 'lib/**/*.js']
    }
  });

  // build all the projects from the ´examples´ folder
  // to run some tests against them
  grunt.registerTask('buildExampleProjects', function () {
    var done = this.async(),
        util = grunt.utils || grunt.util,
        preparation = [false, false, false, false],
        checkForPreparation = function () {
          if (util._.all(preparation, util._.identity)) {
            grunt.log.ok('all examples build');
            done();
          }
        };

    // build libglobal example
    util.spawn({
      cmd: 'grunt',
      args: ['build', '--force'],
      opts: {cwd: 'examples/libglobal'}
    }, function () {
      grunt.log.writeln('> "libglobal" example build');
      preparation[0] = true;
      checkForPreparation();
    });

    // build libglobal-hybrid example
    util.spawn({
      cmd: 'grunt',
      args: ['build', '--force'],
      opts: {cwd: 'examples/libglobal-hybrid'}
    }, function () {
      grunt.log.writeln('> "libglobal-hybrid" example build');
      preparation[3] = true;
      checkForPreparation();
    });

    // build multipage example
    util.spawn({
      cmd: 'grunt',
      args: ['build', '--force'],
      opts: {cwd: 'examples/multipage'}
    }, function () {
      grunt.log.writeln('> "multipage" example build');
      preparation[1] = true;
      checkForPreparation();
    });

    // build multipage-shim example
    util.spawn({
      cmd: 'grunt',
      args: ['build', '--force'],
      opts: {cwd: 'examples/multipage-shim'}
    }, function () {
      grunt.log.writeln('> "multipage-shim" example build');
      preparation[2] = true;
      checkForPreparation();
    });

  });

  // Load tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // Setup the test environment task.
  grunt.registerTask('setUp', ['buildExampleProjects', 'copy', 'requirejs']);

  // Default task.
  grunt.registerTask('default', ['setUp', 'jshint', 'nodeunit', 'clean']);
};
