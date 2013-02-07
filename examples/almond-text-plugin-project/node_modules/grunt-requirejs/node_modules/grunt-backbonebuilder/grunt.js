'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    test: {
      files: ['test/**/*.js']
    },

    lint: {
      files: ['grunt.js', 'tasks/**/*.js', 'lib/**/*.js', 'test/**/*.js']
    },

    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },

    qunit: {
      files: [
        'test/backbonetestsuite/test_view.html',
        'test/backbonetestsuite/test_model.html',
        'test/backbonetestsuite/test_collection.html',
        'test/backbonetestsuite/test_events.html',
        'test/backbonetestsuite/test_router.html',
        'test/backbonetestsuite/test_setdomlibrary.html',
        'test/backbonetestsuite/test_sync.html',
        'test/backbonetestsuite/test_noconflict.html',
      ]
    },

    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.repository.url %>',
        options: {
          paths: ['lib', 'tasks'],
          outdir: 'temp/docs/yui/<%= pkg.version %>'
        }
      }
    },

    compress: {
      zip: {
        files: {
          'test.zip': './lib/*'
        }
      }
    },

    jshint: {
      options: {
        "curly": true,
        "eqeqeq": true,
        "immed": true,
        "latedef": true,
        "newcap": true,
        "noarg": true,
        "sub": true,
        "undef": true,
        "boss": true,
        "eqnull": true,
        "node": true,
        "es5": true
      },
      globals: {
        "exports": true,
        "require": true,
        "module": true
      }
    }

  });

  // Helper tasks, used to create various custtom builds to test against
  var combinations = [['View'], ['Model'], ['Events'], ['Collection'], ['Router']];
  grunt.registerTask('setUp', function () {
    var done = this.async();
    var builder = require(__dirname + '/lib/builder').init(grunt);
    var steps = combinations.length;
    var stepsDone = 0;
    var checkDone = function () {
      if (steps === stepsDone) {
        done();
      }
    };

    // build test fixtures
    combinations.forEach(function (part) {
      builder.build({
        config: {include: part}
      }, function (transport) {
        grunt.log.writeln('Prepared custom ' + part.join(',') + ' fixture');
        grunt.file.write(__dirname + '/fixtures/backbone.custom.' + part.join('.') + '.js', transport.content);
        stepsDone++;
        checkDone();
      });
    });

  });

  grunt.registerTask('tearDown', function () {
    var fs = require('fs');
    // delete test fixtures
    combinations.forEach(function (part) {
      grunt.log.writeln('Deleting fixture backbone.custom.' + part.join('.') + '.js');
      fs.unlinkSync(__dirname + '/fixtures/backbone.custom.' + part.join('.') + '.js');
    });

    fs.rmdirSync(__dirname + '/fixtures');
  });

  // Default task.
  grunt.registerTask('default', 'setUp lint test qunit tearDown');

  // Default task.
  grunt.registerTask('travis', 'setUp lint test qunit tearDown yuidoc compress');
};
