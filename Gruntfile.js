module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    clean: {
      examples: [
        '/examples/libglobal/dist/',
        '/examples/multipage/www-built/',
        '/examples/multipage-shim/www-built/'
      ],
      tmp: ['tmp']
    },

    copy: {
      main: {
        files: [
          {src: ['test/fixtures/*.js'], dest: 'tmp/doNotKillAlmond/', flatten: true, filter: 'isFile'}, // includes files in path
        ]
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
          baseUrl: 'tmp/doNotKillAlmond/test/fixtures',
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

    complexity: {
      generic: {
        src: ['Gruntfile.js', 'tasks/**/*.js', 'test/require_test.js', 'lib/**/*.js'],
        options: {
          errorsOnly: false,
          cyclomatic: 10,
          halstead: 10,
          maintainability: 100
        }
      }
    },

    plato: {
      bc: {
        src: ['Gruntfile.js', 'tasks/**/*.js', 'test/require_test.js', 'lib/**/*.js'],
        dest: 'docs/complexity'
      }
    },

    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },

    jshint: {
      all: ['Gruntfile.js', 'tasks/**/*.js', 'test/require_test.js', 'lib/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });

  // build all the projects from the ´examples´ folder
  // to run some tests against them
  grunt.registerTask('buildExampleProjects', function () {
    var done = this.async();
    var util = grunt.util;
    var examples = 'libglobal multipage multipage-shim'.split(' ');
    var preparation = [];

    var checkForPreparation = function () {
      if (util._.all(preparation, util._.identity)) {
        grunt.log.ok('all examples build');
        done();
      }
    };

    examples.forEach(function () {
      preparation.push(false);
    });

    // build examples
    examples.forEach(function (example, idx) {
      util.spawn({
        cmd: 'grunt',
        args: ['build', '--force'],
        opts: {cwd: 'examples/' + example}
      }, function () {
        grunt.log.writeln('> "' + example + '" example build');
        preparation[idx] = true;
        checkForPreparation();
      });
    });
  });

  // Load tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-plato');

  // Setup the test environment task.
  grunt.registerTask('setUp', ['buildExampleProjects', 'copy', 'requirejs']);

  // Default task.
  grunt.registerTask('default', ['setUp', 'jshint', 'nodeunit', 'qunit', 'clean']);
};
