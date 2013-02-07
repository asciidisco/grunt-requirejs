# Resistance
----
Resistance is a tiny (579 bytes, 347 bytes gzipped) flow control library for javascript.

## Usage

``` js

R.series([
  function(cb) { setTimeout(function() { console.log("Series 1 (500)"); cb(1); }, 500); },
  function(cb) { setTimeout(function() { console.log("Series 2 (250)"); cb(2); }, 250); },
  function(cb) { setTimeout(function() { console.log("Series 3 (100)"); cb(3); }, 100); }
  ], function(data) {
    console.log("Series Complete", data);
});

R.parallel([
  function(cb) { setTimeout(function() { console.log("Parallel 1 (500)"); cb(1); }, 500); },
  function(cb) { setTimeout(function() { console.log("Parallel 2 (250)"); cb(2); }, 250); },
  function(cb) { setTimeout(function() { console.log("Parallel 3 (100)"); cb(3); }, 100); }
  ], function(data) {
    console.log("Parallel Complete", data);
});

```

## Output

    Parallel 3 (100)
    Parallel 2 (250)
    Series 1 (500)
    Parallel 1 (500)
    Parallel Complete [ 1, 2, 3 ]
    Series 2 (250)
    Series 3 (100)
    Series Complete [ 1, 2, 3 ]

## Node.js Support

``` npm install resistance ```

## Ender Support

``` ender build resistance ```

``` js

$.runSeries([]);
$.runParallel([]);

```
