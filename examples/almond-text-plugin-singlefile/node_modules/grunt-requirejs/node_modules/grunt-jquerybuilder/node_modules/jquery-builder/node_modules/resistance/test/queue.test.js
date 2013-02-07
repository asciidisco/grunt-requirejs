var expect = (typeof chai === 'undefined')?require('chai').expect:chai.expect;
if (typeof window === 'undefined') { //browser
  var R = require('../dist/resistance');
}

describe('queue', function() {
  
  it('should return a new queue object', function() {
    var q = R.queue(function() {});
    expect(q.push).to.exist;
    expect(q.run).to.exist;
    expect(q.clear).to.exist;
  });

  describe('run', function() {
    
    it('should run function for each value and return results', function(done) {
      var testsRun = 0;

      var q = R.queue(function(val, next) {
        var delay = val*100;
        setTimeout(function() {
          if (val == 1) { //verify running parallel
            expect(testsRun).to.equal(0);
          } else {
            expect(testsRun).to.equal(1);
          }
          testsRun++;
          next(delay);
        }, delay);
      });

      q.push(2);
      q.push(1);

      q.run(function(val1, val2) {
        expect(val1).to.equal(200);
        expect(val2).to.equal(100);
        expect(testsRun).to.equal(2);
        done();
      });
      
    });
    it('should be able to have two queues running at once', function(done) {
      
        var testsRun = 0;

        var q = R.queue(function(duration, next) {
          setTimeout(function() {
            testsRun++;
            next(duration);
          }, duration);
        });

        q.push(500);
        q.push(200);
        q.run(function(val1, val2) {
          expect(val1).to.equal(500);
          expect(val2).to.equal(200);
        });
        
        var q2 = R.queue(function(duration, next) {
          setTimeout(function() {
            testsRun++;
            next(duration);
          }, duration);
        });

        q2.push(600);
        q2.push(100);
        q2.run(function(val1, val2) {
          expect(val1).to.equal(600);
          expect(val2).to.equal(100);
          expect(testsRun).to.equal(4);
          done();
        });
    });
    
    
  });

  describe('push', function() {
    it('should take an array', function(done) {
      var q = R.queue(function(val, next) {
        var delay = val*100;
        setTimeout(function() {
          next(delay);
        }, delay);
      });

      q.push([1, 2]);

      q.run(function(val1, val2) {
        expect(val1).to.equal(100);
        expect(val2).to.equal(200);
        done();
      });
    });
    it('should take an array of arrays', function(done) {
      var q = R.queue(function(val, next) {
        next(val);
      });

      q.push([[1, 2], [3]]);

      q.run(function(val1, val2) {
        console.log(val1);
        expect(val1.length).to.equal(2);
        expect(val2.length).to.equal(1);
        done();
      });
    });
  });

  it('should take a second parameter to run in series', function(done) {
    
    var testsRun = 0;

    var q = R.queue(function(duration, next) {
      setTimeout(function() {
        if (duration == 500) //make sure running in series
          expect(testsRun).to.equal(0);
        testsRun++;
        next(null, duration);
      }, duration);
    }, true);

    q.push(500);
    q.push(200);
    q.run(function(err, val) {
      expect(err).to.not.exist;
      expect(testsRun).to.equal(2);
      expect(this[0][1]).to.equal(500);
      expect(val).to.equal(200);
      done();
    });
  });
  

  it('should still callback if nothing in queue', function(done) {
    var testsRun = 0;

    var q = R.queue(function(duration, next) {
      setTimeout(function() {
        testsRun++;
        next(duration);
      }, duration);
    });
    q.run(function(data) {
      expect(testsRun).to.equal(0);
      done();
    });
  });
  

  describe('clear', function() {
    it('should clear queue', function(done) {
      var testsRun = 0;

      var q = R.queue(function(duration, next) {
        setTimeout(function() {
          testsRun++;
          next(duration);
        }, duration);
      }, true);

      q.push(500);
      q.push(200);
      q.clear();
      q.run(function(data) {
        expect(testsRun, 0);
        done();
      });
    });
    
    it('should be able to run twice', function(done) {
      
      var testsRun = 0;

      var q = R.queue(function(duration, callback) {
        setTimeout(function() {
          testsRun++;
          callback(duration);
        }, duration);
      }, true);

      q.push(500);
      q.push(200);
      q.run(function(err, val2) {
        expect(testsRun).to.equal(2);
        expect(this[0][1]).to.equal(500);
        expect(val2).to.equal(200);
        q.clear();
        q.push(100);
        q.run(function(val3) {
          expect(val3).to.equal(100);
          expect(testsRun).to.equal(3);
        });
        done();
      });
    });
    
    
  });
});

