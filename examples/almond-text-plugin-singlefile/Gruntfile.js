module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({

    jshint: {
      options: {
        undef: true,
        scripturl: true,
        eqnull: true,
        browser: true,
        noarg: true,
        trailing: true,
        latedef: true,
        eqeqeq: true,
        immed: true,
        newcap: true,
        noempty: true,
        strict: true,
        es5: true,
        globals: {
          console: true,
          module: true,
          require: true,
          define: true,
          requirejs: true,
          strictEqual: true,
          QUnit: true,
          test: true,
          asyncTest: true,
          ok: true,
          equal: true,
          notEqual: true,
          deepEqual: true,
          notDeepEqual: true,
          notStrictEqual: true,
          raises: true,
          start: true,
          stop: true,
          expect: true
        }
      },
      all: ['Gruntfile.js', 'src/js/app/*.js', 'src/js/main.js', 'test/**/*.js']
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'assets'
        }
      }
    },

    clean: {
      dist: ['dist/index.html', 'dist/project-text-almond.js']
    },

    copy: {
      target: {
        options: {
          cwd: 'path/to/sources'
        },
        files: {
          'dist/index.html': 'src/index.html'
        }
      }
    },

    qunit: {
      all: ['test/*.html']
    },

    requirejs : {
      std: {
        options: {
          name: 'main',
          mainConfigFile: 'src/js/main.js',
          out: 'dist/project-text-almond.js',
          optimize: 'none',
          almond: true,
          replaceRequireScript: [{
            files: ['dist/index.html'],
            modulePath: 'project-text-almond'
          }]
        }
      }
    }
  });

  // load require-js task
  grunt.loadTasks('../../tasks');

  // load default grunt-contrib tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // register default task
  grunt.registerTask('default', ['clean', 'jshint', 'qunit', 'copy', 'requirejs']);

};
