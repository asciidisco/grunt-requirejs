// External libs.
var grunt = require('grunt');

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

  testErrorHandlerHelper: function(test) {
    test.expect(2);
    var errorHandler = require(intLibPath + 'helper/errorhandler')({
      log: {
        error: function (message) {
          test.equal(message, 'error', 'Grunt error handler has been called');
        }
      }
    });

    errorHandler = errorHandler.bind({done: function (succeded) {
      test.equal(succeded, false, 'Done called with a not succeding argument');
    }});

    errorHandler('error');

    test.done();
  },

  testGetDefaultRjsVersion: function(test) {
    test.expect(0);
    test.done();
  },

  testGetCustomRjsVersion: function(test) {
    test.expect(0);
    test.done();
  },

  /*'almond helper runs callback even if almond: false': function(test) {
    'use strict';
    var wasCalled = false;
    var config = {
      modules: [],
      almond: false,
      cb: function() {
        wasCalled = true;
      }
    };

    almondify(config);
    test.equal(true, wasCalled);
    test.done();
  }*/
};
