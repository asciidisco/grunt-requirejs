var grunt = require('grunt');
var builder = require('../lib/builder');

// Load local tasks.
grunt.loadTasks('tasks');

exports['require'] = {
  setUp: function(done) {
  'use strict';
    // setup here
    done();
  },
  testSimpleLodashCustomBuilderOutput: function(test) {
    'use strict';
    test.expect(2) ;
    var options = {
      config: {
        include: ['each'],
        debug: true
      }
    };

    var build = builder.init(grunt).build;
    build(options, function (transport) {
      test.equal(transport.type, 'content', 'Transport type has been set correctly');
      test.ok(transport.content.length >= 1, 'Transport content has been generated');
      test.done();
    });
  }

};
