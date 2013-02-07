var expect = (typeof chai === 'undefined')?require('chai').expect:chai.expect;
if (typeof window === 'undefined') { //browser
  var R = require('../lib/resistance');
}

describe('parallel', function() {
  it('should not wait until previous finishes', function(done) {
    var count = 0;
    R.parallel([
      function(next) {
        setTimeout(function() {
          count++;
          next();
        }, 200);
      },
      function(next) {
        expect(count).to.equal(0);
        count++;
        next();
      }
    ], function(data) {
      expect(count).to.equal(2);
      done();
    }); 
  });
  it('should pass data to the final callback', function(done) {
    var count = 0;
    R.parallel([
      function(next) {
        count++;
        next(1);
      },
      function(next) {
        expect(count).to.equal(1);
        count++;
        next(2);
      }
    ], function(val1, val2) {
      expect(count).to.equal(2);
      expect(val1).to.equal(1);
      expect(val2).to.equal(2);
      done();
    }); 
  });

  it('should allow multiple to be run at once', function(done) {
    R.parallel([
      function(next) {
        setTimeout(function() {
          next(1);
        }, 200);
      }], function(data) {
        expect(data).to.equal(1);
        done();
    });
    R.parallel([
      function(next) {
        setTimeout(function() {
          next(2);
        }, 100);
      }], function(data) {
        expect(data).to.equal(2);
    });
    
  });
  
  it('should callback instantly if nothing passed in', function() {
    var ran = false;
    R.parallel([], function() { 
      ran = true;
    });
    expect(ran).to.be.true;
  });
});
