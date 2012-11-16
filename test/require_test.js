var grunt = require('grunt');
// Load local tasks.
grunt.loadTasks('tasks');

// load size diff helper
var sizeInfo = require('../lib/sizeInfo').init(grunt);
// load almond helper
var almondify = require('../lib/almondify').init(grunt);

exports['require'] = {
  setUp: function(done) {
    // setup here
    "use strict";
    done();
  },
  // require_size_info helper test
  'testRequireSizeInfoHelper': function(test) {
    "use strict";
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
  'almond helper runs callback even if almond: false': function(test) {
    "use strict";
    var wasCalled = false,
        options = {
          config: {
            modules: []
          },
          almond: false,
          cb: function() {
            wasCalled = true;
          }
        };

    almondify.almondify(options);
    test.equal(true, wasCalled);
    test.done();
  }
};
