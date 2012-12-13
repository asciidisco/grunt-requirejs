/*global module:false*/
module.exports = function(grunt) {

    // replace this line with
    // grunt.loadNpmTasks("require-js");
    // if you use this example standalone
    grunt.loadTasks("../../tasks");

    grunt.initConfig({

        qunit: {
          all: ['tests/*.html']
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
              wrap: {
                  startFile: 'wrap/wrap.start',
                  endFile: 'wrap/wrap.end'
              }
            }
          }
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
            eqnull: true,
            browser: true,
            nomen: true,
            globals: {
              define: true,
              jQuery: true
            }
          },
          files: ['principium/*.js', 'principium.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('default', ['jshint', 'qunit']);
    grunt.registerTask('build', 'requirejs');
};
