#!/usr/bin/env node

// Post install script for closure compiler & uglyfyjs

;(function() {
  'use strict';

  /** Load Node modules */
  var fs = require('fs'),
      path = require('path'),
      wrench = require('wrench');

  // copy file sync helper function
  var copyFileSync = function(srcFile, destFile) {
    var BUF_LENGTH, buff, bytesRead, fdr, fdw, pos;
    BUF_LENGTH = 64 * 1024;
    buff = new Buffer(BUF_LENGTH);
    fdr = fs.openSync(srcFile, 'r');
    fdw = fs.openSync(destFile, 'w');
    bytesRead = 1;
    pos = 0;
    while (bytesRead > 0) {
      bytesRead = fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
      fs.writeSync(fdw, buff, 0, bytesRead);
      pos += bytesRead;
    }
    fs.closeSync(fdr);
    return fs.closeSync(fdw);
  };

  /** The path of the node-minify library **/
  var nodeMinifyPath = require.resolve('node-minify').replace('index.js', '');

  /** The closure compiler path **/
  var closureCompilerPath = nodeMinifyPath + 'lib/google_closure_compiler-r1918.jar';

  /** The uglifyjs path **/
  var uglifyjsPath = require.resolve('uglify-js').replace('uglify-js.js', '');

  /** The path of the directory that is the base of the repository */
  var basePath = fs.realpathSync(path.join(__dirname, '..', 'node_modules', 'lodash'));

  /** The path of the `vendor` directory */
  var vendorPath = path.join(basePath, 'vendor');

  // Copy closure compiler in the vendor folder
  try {
    console.log('Moving Closure Compiler to lodash/vendor');
    fs.mkdirSync(vendorPath + '/closure-compiler');
    copyFileSync(closureCompilerPath, vendorPath + '/closure-compiler/compiler.jar');
  } catch (e) {}

  // Copy uglifyjs in the vendor folder
  try {
    console.log('Moving UglifyJS to lodash/vendor');
    wrench.copyDirSyncRecursive(uglifyjsPath, vendorPath + '/uglifyjs');
  } catch (e) {}

}());
