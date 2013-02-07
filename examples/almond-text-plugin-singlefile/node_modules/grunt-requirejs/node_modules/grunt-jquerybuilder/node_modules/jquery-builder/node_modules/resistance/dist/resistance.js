/*!
  * Resistance - A javascript flow controller 
  * v1.3.2
  * https://github.com/jgallen23/resistance
  * copyright JGA 2011
  * MIT License
  */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
  else this[name] = definition();
}('R', function() {

var instant = function(fn) {
  setTimeout(fn, 0);
};

var runSeries = function(fns, callback) {
  var completed = -1;
  var data = [];
  if (!callback) {
    callback = function() {};
  }
  var iterate = function() {
    var args = Array.prototype.slice.call(arguments);

    if (args[0]) {
      return callback(args[0]);
    }

    if (completed != -1) {
      args[0] = null;
      data[completed] = args;
    }

    if (++completed == fns.length) {
      return callback.apply(data, args);
    } 

    args[0] = iterate;
    fns[completed].apply(this, args);

  };
  iterate();
};

var runParallel = function(fns, callback) {
  if (fns.length === 0) return callback();
  var started = 0;
  var completed = 0;
  var data = [];
  var iterate = function() {
    fns[started]((function(i) {
      return function(results) {
        data[i] = results;
        if (++completed == fns.length) {
          if (callback) callback.apply(data, data);
          return;
        }
      };
    })(started));
    if (++started != fns.length) iterate();
  };
  iterate();
};

var queue = function(fn, series) {
  var q = [];
  var push = function(item) {
    q.push(function(cb) {
      fn(item, cb);
    });
  }
  return {
    push: function(obj) {
      if (obj instanceof Array) {
        for (var i = 0, c = obj.length; i < c; i++) {
          var item = obj[i];
          push(item);
        }
      } else {
        push(obj);
      }
    },
    run: function(cb) {
      if (!series)
        runParallel(q, cb);
      else
        runSeries(q, cb);
    },
    clear: function() {
      q = [];
    }
  };
};

var R = {
  series: runSeries,
  parallel: runParallel,
  queue: queue
};

return R;
});
