var expect = (typeof chai === 'undefined')?require('chai').expect:chai.expect;
if (typeof window === 'undefined') { //browser
  var R = require('../lib/resistance');
}

describe('series', function() {
  it('should wait until previous finishes', function(done) {
    var count = 0;
    R.series([
      function(next) {
        count++;
        next();
      },
      function(next) {
        expect(count).to.equal(1);
        count++;
        next();
      }
    ], function(data) {
      expect(count).to.equal(2);
      done();
    }); 
  });
  it('should work with async tests', function(done) {
    var count = 0;
    R.series([
      function(next) {
        setTimeout(function() {
          count++;
          next();
        }, 200);
      },
      function(next) {
        expect(count).to.equal(1);
        setTimeout(function() {
          count++;
          next();
        }, 100);
      }
    ], function(data) {
      expect(count).to.equal(2);
      done();
    }); 
  });

  it('should allow multiple series to be run at once', function(done) {
    R.series([
      function(next) {
        setTimeout(function() {
          next(1);
        }, 200);
      }], function(data) {
        expect(data).to.equal(1);
        done();
    });
    R.series([
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
    R.series([], function() { 
      ran = true;
    });
    expect(ran).to.be.true;
  });


  it('series should pass data to next function', function(done) {
    var count = 0;
    R.series([
      function(next) {
        count++;
        next(null, 1);
      },
      function(next, val) {
        expect(count).to.equal(1);
        expect(val).to.equal(1)
        count++;
        next(null, 2, 3);
      },
      function(next, val1, val2) {
        expect(count).to.equal(2);
        expect(val1).to.equal(2);
        expect(val2).to.equal(3);
        count++;
        next(null, 4);
      }
    ], function(err, val) {
      expect(count).to.equal(3);
      expect(val).to.equal(4);

      expect(this).to.be.instanceOf(Array);
      expect(this[0][1]).to.equal(1);
      expect(this[1][1]).to.equal(2);
      expect(this[1][2]).to.equal(3);
      expect(this[2][1]).to.equal(4);
      done();
    }); 
  });

  it('series should stop if error', function(done) {
    var count = 0;
    R.series([
      function(next) {
        count++;
        next(null);
      },
      function(next) {
        count++;
        next(new Error('some error'));
      },
      function(next, val1, val2) {
        count++;
        next(null);
      }
    ], function(err, val) {
      expect(count).to.equal(2);
      expect(err).to.exist;
      expect(err.message).to.equal('some error');
      done();
    }); 
  });
});
