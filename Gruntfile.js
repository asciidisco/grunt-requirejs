module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
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
        jshintrc: '.jshintrc'
      },
      all: ['grunt.js', 'tasks/**/*.js', 'test/require_test.js', 'lib/**/*.js']
    },

    clean: {
      examples: [
        'examples/**/dist/',
        'examples/**/www-built/',
        'examples/**/node_modules/'
      ],
      tmp: ['tmp']
    },

    copy: {
      dist: {
        files: {
          'tmp/doNotKillAlmond/': 'test/fixtures/*.js',
          'examples/almond-text-plugin-project/node_modules/qunitjs/': 'node_modules/qunitjs/**/*',
          'examples/almond-text-plugin-singlefile/node_modules/qunitjs/': 'node_modules/qunitjs/**/*',
          'examples/almond-text-plugin-singlefile/dist/index.html': 'examples/almond-text-plugin-singlefile/src/index.html',
          'examples/libglobal/node_modules/qunitjs/': 'node_modules/qunitjs/**/*',
          'examples/libglobal-hybrid/node_modules/qunitjs/': 'node_modules/qunitjs/**/*',
          'examples/multipage/node_modules/qunitjs/': 'node_modules/qunitjs/**/*',
          'examples/multipage-shim/node_modules/qunitjs/': 'node_modules/qunitjs/**/*'
        }
      }
    },

    // Configuration to be run (and then tested).
    requirejs: {
      // build projects to (node)unit test against
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
      },
      // build example projects
      'almond-text-plugin-project': {
        options: {
          mainConfigFile: 'examples/almond-text-plugin-project/src/js/main.js',
          dir: 'examples/almond-text-plugin-project/dist',
          appDir: 'examples/almond-text-plugin-project/src',
          baseUrl: 'js',
          module: [{name: 'main'}],
          optimize: 'none',
          almond: true,
          name: 'main',
          preserveLicenseComments: false,
          replaceRequireScript: [{
            files: ['examples/almond-text-plugin-project/dist/index.html'],
            name: 'main',
            modulePath: 'js/main'
          }]
        }
      },
      'almond-text-plugin-singlefile': {
        options: {
          name: 'main',
          mainConfigFile: 'examples/almond-text-plugin-singlefile/src/js/main.js',
          out: 'examples/almond-text-plugin-singlefile/dist/project-text-almond.js',
          optimize: 'none',
          almond: true,
          replaceRequireScript: [{
            files: ['examples/almond-text-plugin-singlefile/dist/index.html'],
            modulePath: 'project-text-almond'
          }]
        }
      },
      libglobal: {
        options: {
          name: 'principium',
          almond: true,
          baseUrl: 'examples/libglobal/lib',
          paths: {
            principium: '../principium'
          },
          include: ['principium'],
          exclude: ['jquery', 'underscore'],
          out: 'examples/libglobal/dist/principium.js',
          wrap: {
              startFile: 'examples/libglobal/wrap/wrap.start',
              endFile: 'examples/libglobal/wrap/wrap.end'
          }
        }
      },
      'libglobal-hybrid': {
        options: {
          name: 'principium',
          almond: true,
          baseUrl: 'examples/libglobal-hybrid/lib',
          paths: {
            principium: '../principium'
          },
          include: ['principium'],
          exclude: ['jquery', 'underscore'],
          out: 'examples/libglobal-hybrid/dist/principium.js',
          optimize: 'hybrid',
          wrap: {
            startFile: 'examples/libglobal-hybrid/wrap/wrap.start',
            endFile: 'examples/libglobal-hybrid/wrap/wrap.end'
          }
        }
      },
      multipage: {
        options: {
          appDir: 'examples/multipage/www',
          baseUrl: 'js/lib',
          paths: {
              app: '../app'
          },
          dir: 'examples/multipage/www-built',
          modules: [
            {
              name: '../common',
              include: [
                'jquery',
                'app/lib',
                'app/controller/Base',
                'app/model/Base'
              ]
            },
            {
              name: '../page1',
              include: ['app/main1'],
              exclude: ['../common']
            },
            {
              name: "../page2",
              include: ["app/main2"],
              exclude: ["../common"]
            }
          ]
        }
      },
      'multipage-shim': {
        options: {
          appDir: 'examples/multipage-shim/www',
          mainConfigFile: 'examples/multipage-shim/www/js/common.js',
          dir: 'examples/multipage-shim/www-built',
          modules: [
            {
              name: '../common',
              include: [
                'jquery',
                'app/lib',
                'app/controller/Base',
                'app/model/Base'
              ]
            },
            {
                name: 'app/main1',
                exclude: ['../common']
            },
            {
                name: 'app/main2',
                exclude: ['../common']
            }
          ]
        }
      }
    }
  });

  // grunt-contrib-internals sets the travis-ci badge to
  // the 'gruntjs' profile, i replace this with the path to my profile
  grunt.registerTask('replaceTravisBadgeInReadme', function () {
    var readme = grunt.file.read('README.md');
    readme = readme.replace('/gruntjs/grunt-requirejs.png', '/asciidisco/grunt-requirejs.png');
    readme = readme.replace('/gruntjs/grunt-requirejs)', '/asciidisco/grunt-requirejs)');
    grunt.file.write('README.md', readme);
  });

  // Load tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // Default task.
  grunt.registerTask('default', ['copy', 'requirejs', 'jshint', 'nodeunit', 'qunit', 'clean', 'build-contrib', 'replaceTravisBadgeInReadme']);
};
