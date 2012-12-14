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

    clean: {
      dist: ['dist']
    },

    qunit: {
      all: ['test/*.html']
    },

    requirejs : {
      std: {
        options: {
          mainConfigFile: 'src/js/main.js',
          dir: 'dist',
          appDir: 'src',
          baseUrl: 'js',
          module: [{name: 'main'}],
          optimize: 'none',
          almond: true,
          name: 'main',
          preserveLicenseComments: false,
          replaceRequireScript: [{
            files: ['dist/index.html'],
            name: 'main',
            modulePath: 'js/main'
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

  // register default task
  grunt.registerTask('default', ['clean', 'jshint', 'qunit', 'requirejs']);

};
