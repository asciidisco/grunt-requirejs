// External libs.
var grunt = require('grunt');
var Q = require('q');

// Load local tasks.
grunt.loadTasks('tasks');

// Path to internal libs
var intLibPath = '../lib/';

// Internal libs.
var sizeInfo = require(intLibPath + 'helper/sizeInfo').init(grunt);
var rjsversion = require(intLibPath + 'helper/rjsversion').init(grunt);
var closurecompiler = require(intLibPath + 'helper/closurecompiler').init(grunt);
var optimize = require(intLibPath + 'optimize').init(grunt);
var almondify = require(intLibPath + 'almondify').init(grunt);
var replaceAlmondInHtmlFiles = require(intLibPath + 'replace').init(grunt);
var lodashCustomBuilder = require(intLibPath + 'custombuilder/lodash').init(grunt);
var jqueryCustomBuilder = require(intLibPath + 'custombuilder/jquery').init(grunt);
var backboneCustomBuilder = require(intLibPath + 'custombuilder/backbone').init(grunt);

exports['require'] = {
  setUp: function(done) {
    'use strict';
    done();
  },

  // require_size_info helper test
  testRequireSizeInfoHelper: function(test) {
    'use strict';
    var helperValuesSeriesA = sizeInfo.info('a', true, 'foo'),
        helperValuesSeriesB = sizeInfo.info('b', false, 'foobar');
    test.expect(10);

    // tests here
    test.equal(helperValuesSeriesA.module, 'a', 'Should determine the module');
    test.equal(helperValuesSeriesA.gzipSize, 23, 'Should determine the correct gzip size');
    test.equal(helperValuesSeriesA.fileSize, 3, 'Should determine the correct "file" size');
    test.equal(helperValuesSeriesA.messageUncompressed, 'Uncompressed size: \u001b[32m3\u001b[39m bytes.', 'Should output the correct message');
    test.equal(helperValuesSeriesA.messageCompressed, 'Compressed size: \u001b[32m23\u001b[39m bytes gzipped. (\u001b[32m3\u001b[39m bytes minified)', 'Should output the correct message');

    test.equal(helperValuesSeriesB.module, 'b', 'Should determine the module');
    test.equal(helperValuesSeriesB.gzipSize, 26, 'Should determine the correct gzip size');
    test.equal(helperValuesSeriesB.fileSize, 6, 'Should determine the correct "file" size');
    test.equal(helperValuesSeriesB.messageUncompressed, 'Uncompressed size: \u001b[32m6\u001b[39m bytes.');
    test.equal(helperValuesSeriesB.messageCompressed, 'Compressed size: \u001b[32m26\u001b[39m bytes gzipped.', 'Should output the correct message');

    test.done();
  },

  // test the error handler
  testErrorHandlerHelper: function(test) {
    'use strict';
    test.expect(2);
    var errorHandler = require(intLibPath + 'helper/errorhandler')({
      log: {
        error: function(message) {
          test.equal(message, 'error', 'Grunt error handler has been called');
        }
      }
    });

    errorHandler = errorHandler.bind({done: function(succeded) {
      test.equal(succeded, false, 'Done called with a not succeding argument');
    }});

    errorHandler('error');

    test.done();
  },

  // test the require js default version return
  testGetDefaultRjsVersion: function(test) {
    'use strict';
    test.expect(3);
    var config = {};

    var rjs = rjsversion.getRequirejs(config);
    var version = rjsversion.getRequirejsVersionInfo();
    var isCustom = rjsversion.isCustomLibrary();
    var semver = require('semver');

    test.equal((typeof rjs === 'function'), true, 'Default library is used if no config given');
    test.ok(semver.satisfies(version, '2.1.x'), 'Version is current');
    test.equal(isCustom, false, 'Default library is used if no config given');

    test.done();
  },

  // test the require js custom version return
  testGetCustomRjsVersion: function(test) {
    'use strict';
    test.expect(3);
    var config = {rjs: __dirname + '/fixtures/requirejs'};

    var rjs = rjsversion.getRequirejs(config);
    var version = rjsversion.getRequirejsVersionInfo();
    var isCustom = rjsversion.isCustomLibrary();

    test.equal((typeof rjs === 'function'), true, 'Custom library is used if custom config given');
    test.equal(version, '2.0.6', 'Custom version has been set');
    test.equal(isCustom, true, 'Custom library is used if correct config is given');

    test.done();
  },

  // test the output of the backbone builder
  testBackboneCustomBuilderOutput: function(test) {
    'use strict';
    test.expect(2);
    var config = {
      builder: {backbone:{include: ['View']}}
    };

    Q.fcall(backboneCustomBuilder, config)
      .then(function(modifiedConfig) {
        test.equal((typeof modifiedConfig.__builderOutput === 'object'), true, 'Builder output has been generated');
        test.equal(modifiedConfig.__builderOutput[0].name, 'backbone', 'Builder output has been named correctly');
        test.done();
      })
      .done();
  },

  // test the output of the lodash builder
  // testLodashCustomBuilderOutput: function(test) {
  //   'use strict';
  //   test.expect(2) ;
  //   var config = {
  //     builder: {lodash: {include: ['each'] } }
  //   };

  //   Q.fcall(lodashCustomBuilder, config)
  //     .then(function(modifiedConfig) {
  //       test.equal((typeof modifiedConfig.__builderOutput === 'object'), true, 'Builder output has been generated');
  //       test.equal(modifiedConfig.__builderOutput[0].name, 'lodash', 'Builder output has been named correctly');
  //       test.done();
  //     })
  //     .done();
  // },

  // test the output of the jQuery builder
  testjQueryCustomBuilderOutput: function(test) {
    'use strict';
    test.expect(2);
    var config = {
      builder: {
        jquery: {
          exclude: ['deprecated', 'effects']
        },
      }
    };

    Q.fcall(jqueryCustomBuilder, config)
      .fail(function () {
        console.log(arguments);
      })
      .then(function(modifiedConfig) {
        test.equal((typeof modifiedConfig.__builderOutput === 'object'), true, 'Builder output has been generated');
        test.equal(modifiedConfig.__builderOutput[0].name, 'jquery', 'Builder output has been named correctly');
        test.done();
      })
      .done();
  },

  'almond helper runs callback even if almond: false': function(test) {
    'use strict';
    test.expect(1);
    var config = {
      modules: [],
      almond: false,
      cb: function() {
        test.equal(true, true);
        test.done();
      }
    };

    Q.fcall(almondify, config)
      .then(config.cb || function () {})
      .done();
  },

  main: function(test) {
    'use strict';
    var expect, result;
    test.expect(1);
    expect = 'define("hello",[],function(){return"hello"}),define("world",[],function(){return"world"}),require(["hello","world"],function(e,t){console.log(e,t)}),define("project",function(){});';
    result = grunt.file.read('tmp/requirejs.js');
    test.equal(expect, result, 'should optimize javascript modules with requireJS');
    test.done();
  },

  template: function(test) {
    'use strict';
    var expect, result;
    test.expect(1);
    expect = 'define("hello",[],function(){return"hello"}),define("world",[],function(){return"world"}),require(["hello","world"],function(e,t){console.log(e,t)}),define("project",function(){});';
    result = grunt.file.read('tmp/requirejs-template.js');
    test.equal(expect, result, 'should process options with template variables.');
    test.done();
  },

  'sourcemaps can be generated using uglify2': function(test) {
    'use strict';
    test.expect(2);

    var expectMap = '{"version":3,"file":"requirejs-sourcemaps.js","sources":["requirejs-sourcemaps.js.src"],"names":["eval","require","hello","world","console","log","define"],"mappings":"AACAA,KAAK,gFAELA,KAAK,gFAELC,SAAS,QAAS,SAAU,SAASC,EAAOC,GAC1CC,QAAQC,IAAIH,EAAMC,KAGpBG,OAAO,UAAW"}';
    var resultMap = grunt.file.read('tmp/requirejs-sourcemaps.js.map');
    test.equal(expectMap, resultMap, 'should generate a ´.map´ sourcemap file');

    var expectSrc = grunt.file.read('test/fixtures/sourcemapresult.txt');
    var resultSrc = grunt.file.read('tmp/requirejs-sourcemaps.js.src');
    test.equal(expectSrc, resultSrc, 'should generate a ´.src sourcemap file');

    test.done();
  },

  'closure compiler can be executed': function(test) {
    'use strict';
    test.expect(1);
    grunt.file.copy('test/fixtures/hello.js', 'tmp/hello.js');

    closurecompiler({buildPath: 'tmp/hello.js'}, function (error, output) {
      test.equal(output.stdout, 'define(function(){return"hello"});', 'Closure compiler should minify file');
      test.done();
    });
  },

  'requirejs script tag can be replaced with almondified script tag': function(test) {
    'use strict';
    test.expect(1);
    var config = {
      replaceRequireScript: [{
        files: ['tmp/replaceSingleAlmond.html'],
        module: 'main'
      }],
      modules: [{name: 'main'}],
      almond: true
    };

    grunt.file.copy('test/fixtures/replaceSingleAlmond.html', 'tmp/replaceSingleAlmond.html');
    replaceAlmondInHtmlFiles(config);
    var replacedFileContents = grunt.file.read(config.replaceRequireScript[0].files[0]);
    test.ok(replacedFileContents.search('<script src="js/main.js"></script>') > -1, 'should replace script tag ´src´ contents');
    test.done();
  },

  'requirejs script tag can be replaced with almondified script tag with no doctype declared (#59)': function(test) {
    'use strict';
    test.expect(1);
    var config = {
        replaceRequireScript: [{
            files: ['tmp/replaceSingleAlmondNoDocType.html'],
        module: 'main'
        }],
        modules: [{name: 'main'}],
        almond: true
    };

    grunt.file.copy('test/fixtures/replaceSingleAlmondNoDocType.html', 'tmp/replaceSingleAlmondNoDocType.html');
    replaceAlmondInHtmlFiles(config);
    var replacedFileContents = grunt.file.read(config.replaceRequireScript[0].files[0]);
    test.ok(replacedFileContents.search('<script src="js/main.js"></script>') > -1, 'should replace script tag ´src´ contents');
    test.done();
  },

  'requirejs script tag can be replaced with almondified script tag & leaves attributes': function(test) {
    'use strict';
    test.expect(1);
    var config = {
      replaceRequireScript: [{
        files: ['tmp/replaceSingleAlmondWithAttr.html'],
        module: 'main'
      }],
      modules: [{name: 'main'}],
      almond: true
    };

    grunt.file.copy('test/fixtures/replaceSingleAlmondWithAttr.html', 'tmp/replaceSingleAlmondWithAttr.html');
    replaceAlmondInHtmlFiles(config);
    var replacedFileContents = grunt.file.read(config.replaceRequireScript[0].files[0]);
    test.ok(replacedFileContents.search('<script src="js/main.js" async="true"></script>') > -1, 'should replace script tag ´src´ contents, but leaves the other attrs alone');
    test.done();
  },

  'requirejs script tag can be replaced with almondified script tag & leaves weird attributes': function(test) {
    'use strict';
    test.expect(1);
    var config = {
      replaceRequireScript: [{
        files: ['tmp/replaceSingleAlmondWithComplexAttr.html'],
        module: 'main'
      }],
      modules: [{name: 'main'}],
      almond: true
    };

    grunt.file.copy('test/fixtures/replaceSingleAlmondWithComplexAttr.html', 'tmp/replaceSingleAlmondWithComplexAttr.html');
    replaceAlmondInHtmlFiles(config);
    var replacedFileContents = grunt.file.read(config.replaceRequireScript[0].files[0]);
    test.ok(replacedFileContents.search('<script src="js/main.js" data-someweirdangularthingy="a > b" async="true"></script>') > -1, 'should replace script tag ´src´ contents, but leaves the other (complex) attrs alone');
    test.done();
  },

  'multiple requirejs script tags can be replaced with almondified script tags': function(test) {
    'use strict';
    test.expect(2);
    var config = {
      replaceRequireScript: [{
        files: ['tmp/replaceMultiAlmond.html'],
        module: ['module1', 'module2']
      }],
      modules: [{name: 'module1'}, {name: 'module2'}],
      almond: true
    };

    grunt.file.copy('test/fixtures/replaceMultiAlmond.html', 'tmp/replaceMultiAlmond.html');
    replaceAlmondInHtmlFiles(config);
    var replacedFileContents = grunt.file.read(config.replaceRequireScript[0].files[0]);
    test.ok(replacedFileContents.search('<script src="js/module1.js" async="true"></script>') > -1, 'should replace multiple script tag ´src´ contents, but leaves the other attrs alone');
    test.ok(replacedFileContents.search('<script src="js/module2.js" async="true"></script>') > -1, 'should replace multiple script tag ´src´ contents, but leaves the other attrs alone');
    test.done();
  },

  'requirejs script tag can be replaced with almondified script tag in multiple files': function(test) {
    'use strict';
    test.expect(2);
    var config = {
      replaceRequireScript: [{
        files: ['tmp/multi1.html', 'tmp/multi2.html'],
        module: 'main'
      }],
      modules: [{name: 'main'}],
      almond: true
    };

    grunt.file.copy('test/fixtures/replaceSingleAlmond.html', 'tmp/multi1.html');
    grunt.file.copy('test/fixtures/replaceSingleAlmond.html', 'tmp/multi2.html');
    replaceAlmondInHtmlFiles(config);
    var replacedFileContents1 = grunt.file.read(config.replaceRequireScript[0].files[0]);
    var replacedFileContents2 = grunt.file.read(config.replaceRequireScript[0].files[1]);
    test.ok(replacedFileContents1, 'should replace script tag ´src´ contents');
    test.ok(replacedFileContents2.search('<script src="js/main.js"></script>') > -1, 'should replace script tag ´src´ contents');
    test.done();
  },

  'using removeCombined option with almond doesnt touch original almond file': function(test) {
    'use strict';
    var result;
    test.expect(1);
    result = grunt.file.read('node_modules/almond/almond.js');
    test.ok(result.length > 0, 'original almond.js should still be there');
    test.done();
  }

};
