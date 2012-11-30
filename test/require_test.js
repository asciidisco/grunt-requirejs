// External libs.
var grunt = require('grunt');
var Q = require('q');

// Load local tasks.
grunt.loadTasks('tasks');

// Path to internal libs
var intLibPath = '../lib/';

// Internal libs.
var sizeInfo = require(intLibPath + 'helper/sizeInfo').init(grunt);
var rjsversion = require(intLibPath + 'helper/rjsversion').init(grunt);
var closurecompiler = require(intLibPath + 'helper/closurecompiler').init(grunt);
var optimize = require(intLibPath + 'optimize').init(grunt);
var almondify = require(intLibPath + 'almondify').init(grunt);
var replaceAlmondInHtmlFiles = require(intLibPath + 'replace').init(grunt);
var lodashCustomBuilder = require(intLibPath + 'custombuilder/lodash').init(grunt);
var jqueryCustomBuilder = require(intLibPath + 'custombuilder/jquery').init(grunt);
var backboneCustomBuilder = require(intLibPath + 'custombuilder/backbone').init(grunt);

exports['require'] = {
  setUp: function(done) {
    'use strict';
    done();
  },

  // require_size_info helper test
  testRequireSizeInfoHelper: function(test) {
    'use strict';
    var helperValuesSeriesA = sizeInfo.info('a', true, 'foo'),
        helperValuesSeriesB = sizeInfo.info('b', false, 'foobar');
    test.expect(10);

    // tests here
    test.equal(helperValuesSeriesA.module, 'a', 'Should determine the module');
    test.equal(helperValuesSeriesA.gzipSize, 23, 'Should determine the correct gzip size');
    test.equal(helperValuesSeriesA.fileSize, 3, 'Should determine the correct "file" size');
    test.equal(helperValuesSeriesA.messageUncompressed, 'Uncompressed size: \u001b[32m3\u001b[39m bytes.', 'Should output the correct message');
    test.equal(helperValuesSeriesA.messageCompressed, 'Compressed size: \u001b[32m23\u001b[39m bytes gzipped. (\u001b[32m3\u001b[39m bytes minified)', 'Should output the correct message');

    test.equal(helperValuesSeriesB.module, 'b', 'Should determine the module');
    test.equal(helperValuesSeriesB.gzipSize, 26, 'Should determine the correct gzip size');
    test.equal(helperValuesSeriesB.fileSize, 6, 'Should determine the correct "file" size');
    test.equal(helperValuesSeriesB.messageUncompressed, 'Uncompressed size: \u001b[32m6\u001b[39m bytes.');
    test.equal(helperValuesSeriesB.messageCompressed, 'Compressed size: \u001b[32m26\u001b[39m bytes gzipped.', 'Should output the correct message');

    test.done();
  },

  // test the error handler
  testErrorHandlerHelper: function(test) {
    'use strict';
    test.expect(2);
    var errorHandler = require(intLibPath + 'helper/errorhandler')({
      log: {
        error: function(message) {
          test.equal(message, 'error', 'Grunt error handler has been called');
        }
      }
    });

    errorHandler = errorHandler.bind({done: function(succeded) {
      test.equal(succeded, false, 'Done called with a not succeding argument');
    }});

    errorHandler('error');

    test.done();
  },

  // test the require js default version return
  testGetDefaultRjsVersion: function(test) {
    'use strict';
    test.expect(3);
    var config = {};

    var rjs = rjsversion.getRequirejs(config);
    var version = rjsversion.getRequirejsVersionInfo();
    var isCustom = rjsversion.isCustomLibrary();

    test.equal((typeof rjs === 'function'), true, 'Default library is used if no config given');
    test.equal(version, '2.1.2', 'Version is current');
    test.equal(isCustom, false, 'Default library is used if no config given');

    test.done();
  },

  // test the require js custom version return
  testGetCustomRjsVersion: function(test) {
    'use strict';
    test.expect(3);
    var config = {rjs: __dirname + '/fixtures/requirejs'};

    var rjs = rjsversion.getRequirejs(config);
    var version = rjsversion.getRequirejsVersionInfo();
    var isCustom = rjsversion.isCustomLibrary();

    test.equal((typeof rjs === 'function'), true, 'Custom library is used if custom config given');
    test.equal(version, '2.0.6', 'Custom version has been set');
    test.equal(isCustom, true, 'Custom library is used if correct config is given');

    test.done();
  },

  // test the output of the backbone builder
  testBackboneCustomBuilderOutput: function(test) {
    'use strict';
    test.expect(2);
    var config = {
      builder: {backbone:{include: ['View']}}
    };

    Q.fcall(backboneCustomBuilder, config)
      .then(function(modifiedConfig) {
        test.equal((typeof modifiedConfig.__builderOutput === 'object'), true, 'Builder output has been generated');
        test.equal(modifiedConfig.__builderOutput[0].name, 'backbone', 'Builder output has been named correctly');
        test.done();
      })
      .done();
  },

  // test the output of the lodash builder
  testLodashCustomBuilderOutput: function(test) {
    'use strict';
    test.expect(2) ;
    var config = {
      builder: {lodash: {include: ['each'] } }
    };

    Q.fcall(lodashCustomBuilder, config)
      .then(function(modifiedConfig) {
        test.equal((typeof modifiedConfig.__builderOutput === 'object'), true, 'Builder output has been generated');
        test.equal(modifiedConfig.__builderOutput[0].name, 'lodash', 'Builder output has been named correctly');
        test.done();
      })
      .done();
  },

  // test the output of the jQuery builder
  testjQueryCustomBuilderOutput: function(test) {
    'use strict';
    test.expect(2);
    var config = {
      builder: {
        jquery: {
          exclude: ['deprecated', 'effects']
        },
      }
    };

    Q.fcall(jqueryCustomBuilder, config)
      .then(function(modifiedConfig) {
        test.equal((typeof modifiedConfig.__builderOutput === 'object'), true, 'Builder output has been generated');
        test.equal(modifiedConfig.__builderOutput[0].name, 'jquery', 'Builder output has been named correctly');
        test.done();
      })
      .done();
  },

  'almond helper runs callback even if almond: false': function(test) {
    'use strict';
    test.expect(1);
    var config = {
      modules: [],
      almond: false,
      cb: function() {
        test.equal(true, true);
        test.done();
      }
    };

    Q.fcall(almondify, config)
      .then(config.cb || function () {})
      .done();
  },

  'sourcemaps can be generated using uglify2': function(test) {
    'use strict';
    test.expect(0);
    test.done();
  },

  'closure compiler can be executed': function(test) {
    'use strict';
    test.expect(0);
    test.done();
  },

  'requirejs script tag can be replaced with almondified script tag': function(test) {
    'use strict';
    test.expect(0);
    test.done();
  },

  'requirejs script tag can be replaced with almondified script tag & leaves attributes': function(test) {
    'use strict';
    test.expect(0);
    test.done();
  },

  'multiple requirejs script tags can be replaced with almondified script tags': function(test) {
    'use strict';
    test.expect(0);
    test.done();
  }

};
