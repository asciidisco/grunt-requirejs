/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      dist: ['dist']
    },

    qunit: {
      all: ["tests/*.html"]
    },

    requirejs: {
      std: {
        options: {
          almond: true,
          baseUrl: 'lib',
          paths: {
            principium: '../principium'
          },
          include: ['principium'],
          exclude: ['jquery', 'underscore'],
          out: 'dist/principium.js',
          optimize: 'hybrid',
          wrap: {
            startFile: 'wrap/wrap.start',
            endFile: 'wrap/wrap.end'
          }
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['principium/*.js', 'principium.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-requirejs');

  grunt.registerTask('default', ['clean', 'jshint', 'requirejs', 'qunit']);
};
