var expect = (typeof chai === 'undefined')?require('chai').expect:chai.expect;
if (typeof window === 'undefined') { //browser
  var aug = require('../lib/aug');
}

describe('aug', function() {

  it('should override', function() {
    var o1 = { a: 1 };
    var o2 = { a: 2 };
    var o = aug(o1, o2);
    expect(o.a).to.equal(2);
  });

  it('should extend', function() {
    var o1 = { a: 1 };
    var o2 = { b: 2 };
    var o = aug(o1, o2);
    expect(o.a).to.equal(1);
    expect(o.b).to.equal(2);
  });

  it('should change first param', function() {
    var o1 = { a: 1 };
    var o2 = { b: 2 };
    var o = aug(o1, o2);
    expect(o1.a).to.equal(1);
    expect(o1.b).to.equal(2);
    expect(o1).to.equal(o);
  });
  
  it('should take N number of objects', function() {
    var o1 = { a: 1, d: 7 };
    var o2 = { a: 2, b: 4 };
    var o3 = { a: 3, b: 5, c: 1 };

    aug(o1, o2, o3);

    expect(o1.a).to.equal(3);
    expect(o1.b).to.equal(5);
    expect(o1.c).to.equal(1);
    expect(o1.d).to.equal(7);
    
  });

  it('should extend prototypes', function() {
    var Class1 = function() {
    };
    Class1.prototype.test = function() {
      return true;
    };

    aug(Class1.prototype, {
      test: function() {
        return false;
      },
      test2: function() {
        return true;
      }
    });
    var c = new Class1();
    expect(c.test()).to.be.false;
    expect(c.test2()).to.be.true;
    Class1.prototype.test3 = function() {
      return true;
    };
    expect(c.test3()).to.be.true;
  });
  
  it('should extend a function', function() {
    var f = function() {};
    aug(f, {
      prop: 42
    });
    expect(f.prop).to.equal(42);
  });

  it('should extend arrays', function() {
    var o = aug([1,2,3], [4]);
    expect(o[0]).to.equal(4);
    expect(o[1]).to.equal(2);
    expect(o[2]).to.equal(3);
    expect(o.length).to.equal(3);
  });
  
  it('should extend prototypes', function() {
    Array.prototype.lulz = 42;
    var o = {};
    aug(o, []);
    expect(o.lulz).to.equal(42);
  });

  describe('clone', function() {
    it('should clone object', function() {
      var o1 = { debug: false };

      var o2 = aug({}, o1);
      o1.test = 1;
      expect(o2.test).to.not.exist;
      expect(o2.debug).to.be.false;
    });
    
  });

  describe('deep', function() {
    it('should take in option for deep extend', function() {
      var o1 = { a: { b: 1, c: 3 }, d: 1 };
      var o2 = { a: { b: 2 } };
      aug(true, o1, o2);
      expect(o1.a.b).to.equal(2);
      expect(o1.a.c).to.equal(3);
      expect(o1.d).to.equal(1);
    });

    it('should handle deep extends if root doesn\'t exist', function() {
      var o1 = { };
      var o2 = { a: { b: 2 } };
      aug(true, o1, o2);
      expect(o1.a.b).to.equal(2);
    });

    it('should handled multiple levels', function() {
      var o1 = { a: { b: { c: 0, d: 1 } } };
      var o2 = { a: { b: { c: 1 } } };
      aug(true, o1, o2);
      expect(o1.a.b.c).to.equal(1);
      expect(o1.a.b.d).to.equal(1);
    });

    it('should clone any nested object', function() {

      var schema = {
        firstName: '',
        lastName: '',
        family: {}
      };
      var jane = {
        firstName: 'Jane',
        lastName: 'Smith',
        family: {
          'bob': true
        }
      };
      var john = {
        firstName: 'John',
        lastName: 'Smith'
      };

      var p1 = aug(true, {}, schema, jane);
      var p2 = aug(true, {}, schema, john);
      p1.family.test = 1;
      expect(p1.family).to.not.eql(p2.family);
      expect(p2.family.bob).to.not.exist;
      expect(p2.family.test).to.not.exist;
      
    });
  });
  
});
