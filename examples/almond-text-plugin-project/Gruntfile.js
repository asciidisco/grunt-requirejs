 module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc'
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

  // load default grunt-contrib tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-requirejs');

  // register default task
  grunt.registerTask('default', ['clean', 'jshint', 'qunit', 'requirejs']);

};
