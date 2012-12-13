/*global module:false*/
module.exports = function(grunt) {

    grunt.initConfig({

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
              define: true
            }
          },
          all: ['principium/*.js', 'principium.js']
        }
    });

    // replace this line with
    // grunt.loadNpmTasks("require-js");
    // if you use this example standalone
    grunt.loadTasks('../../tasks');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('default', ['jshint', 'qunit']);
    grunt.registerTask('build', 'requirejs');
};
