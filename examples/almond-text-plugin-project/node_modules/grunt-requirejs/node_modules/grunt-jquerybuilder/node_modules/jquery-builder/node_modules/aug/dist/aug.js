/*!
  * aug.js - A javascript library to extend existing objects and prototypes 
  * v0.0.5
  * https://github.com/jgallen23/aug
  * copyright JGA 2011
  * MIT License
  */

var aug = function __aug() {
  var options, name, src, copy, clone, c,
      deep = false,
      args = Array.prototype.slice.call(arguments),
      target = args.shift(),
      i = 0;

  if (typeof target === 'boolean') {
    deep = true;
    target = args.shift();
  }
  for (c = args.length; i < c; i++) {
    if ((options = args[i]) === null)
      continue;
    for (name in options) {
      src = target[name];
      copy = options[name];

      if (target === copy)
        continue;

      if (deep && copy && typeof copy === 'object') {
        if (copy instanceof Array) {
          clone = src && src instanceof Array ? src : [];
        } else {
          clone = src && typeof src === 'object' ? src : {};
        }
        target[name] = aug(deep, clone, copy);
      } else {
        target[name] = copy;
      }
    }
  }
  return target;
};
if (typeof module !== 'undefined') module.exports = aug;
