/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      dist: ['www-built']
    },

    qunit: {
      all: ['tests/*.html']
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['www/js/app/*.js', 'www/js/common.js', 'www/js/page1.js', 'www/js/page2.js']
    },

    requirejs: {
      std: {
        options: {
          appDir: 'www',
          mainConfigFile: 'www/js/common.js',
          dir: 'www-built',
          modules: [
            //First set up the common build layer.
            {
              //module names are relative to baseUrl
              name: '../common',
              //List common dependencies here. Only need to list
              //top level dependencies, "include" will find
              //nested dependencies.
              include: [
                'jquery',
                'app/lib',
                'app/controller/Base',
                'app/model/Base'
              ]
            },
            //Now set up a build layer for each main layer, but exclude
            //the common one. "exclude" will exclude nested
            //the nested, built dependencies from "common". Any
            //"exclude" that includes built modules should be
            //listed before the build layer that wants to exclude it.
            //The "page1" and "page2" modules are **not** the targets of
            //the optimization, because shim config is in play, and
            //shimmed dependencies need to maintain their load order.
            //In this example, common.js will hold jquery, so backbone
            //needs to be delayed from loading until common.js finishes.
            //That loading sequence is controlled in page1.js.
            {
                //module names are relative to baseUrl/paths config
                name: 'app/main1',
                exclude: ['../common']
            },

            {
                //module names are relative to baseUrl
                name: 'app/main2',
                exclude: ['../common']
            }
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.registerTask('default', ['clean', 'jshint', 'requirejs', 'qunit']);
};
