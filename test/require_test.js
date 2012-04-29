var grunt = require('grunt');

exports['require'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'helper': function(test) {
    test.expect(1);
    // tests here
    test.equal(grunt.helper('require'), 'require!!!', 'should return the correct value.');
    test.done();
  }
};
