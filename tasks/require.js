/*
 * grunt-require
 * https://github.com/asciidisco/grunt-requirejs
 *
 * Copyright (c) 2012 asciidisco
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  // Grunt utilities.
  var task = grunt.task;
  var file = grunt.file;
  var log = grunt.log;
  var verbose = grunt.verbose;
  var fail = grunt.fail;
  var config = grunt.config;
  var utils = typeof grunt.utils !== 'undefined' ? grunt.utils : grunt.util;

  // shortcuts
  var isArray = utils._.isArray;
  var isFunction = utils._.isFunction;
  var clone = utils._.clone;
  
  // lib dependencies
  var rjs = require('requirejs'); 
  var $ = require('jQuery');
  var npm = require('npm');
  var fs = require('fs');

  // ==========================================================================
  // PRIVATE HELPER FUNCTIONS
  // ==========================================================================

  // runs the require js optimizer
  var optimize = function (config, done, cb) {
    return function (chgConfig) {
        grunt.helper('optimize', {
            config: typeof chgConfig === 'undefined' ? config : chgConfig,
            done: done,
            cb: cb
        });      
    }
  };

  // runs the almond js html file replacement
  var replaceAlmond = function (config, done, cb) {
    return function (chgConfig) {
        grunt.helper('replaceRequireWithAlmond', {
            config: typeof chgConfig === 'undefined' ? config : chgConfig,
            done: done,
            cb: cb
        });
    }
  };

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('requirejs', 'Runs requirejs optimizer', function() {
    var done = this.async(),
        rqConfig = config.get('requirejs');

    // log process start
    log.ok('RequireJS optimizer started');

    // execute clear target helper
    grunt.helper('almond', {
      config: rqConfig,
      done: done,
      cb: optimize(rqConfig, done, replaceAlmond(rqConfig, done))
    });
    
    return done;
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  // helper to execute requirejs optimizer function
  grunt.registerHelper('optimize', function (options) {
    // call rjs optimizer 
    rjs.optimize(options.config, function (result) {
      // check if verbose flag is set, then log result
      grunt.verbose.ok(result);

      // log process end
      log.ok('RequireJS optimizer finished');

      // display sizes of modules
      if (isArray(options.config.modules) && options.config.dir && options.config.baseUrl) {
        options.config.modules.forEach(function (module) {
          try {
            // Query the entry
            stats = fs.lstatSync(module._buildPath);

            // Is it a file
            if (stats.isFile()) {
                grunt.helper('require_size_info', module.name, options.config.optimize, grunt.file.read(module._buildPath, 'utf-8'));
            }
          }
          catch (e) {
            log.warn('Stats not available for module: ' + module.name);
          }

        });
      }

      // check for callback, else mark as done
      if (isFunction(options.cb)) {
        options.cb();
      } else {
        options.done();
      }

    });
  });

  // helper to execute requirejs optimizer function
  grunt.registerHelper('replaceRequireWithAlmond', function (options) {
    // check if we should replace require with almond in html files
    if (options.config.almond === true && isArray(options.config.replaceRequireScript)) {
      var $ = require('jQuery').create();

      // iterate over all modules that are configured for replacement
      options.config.replaceRequireScript.forEach(function (entry, idx) {
        var files = grunt.file.expand(entry.files);
        // log almond including
        log.ok('Replacing require script calls, with almond module files');

        // iterate over found html files
        files.forEach(function (file, index) {
          // load file contents
          var contents = String(grunt.file.read(file, 'utf-8'));
          // iterate over content nodes to find the correct script tags
          $(contents).each(function (idx, elm) {

            // check for require js like script tags
            if (String(elm.tagName).toLowerCase() === 'script' && $(elm).attr('data-main') !== '') {
              // replace the attributes of requires script tag
              // with the 'almonded' version of the module
              var $newElm = $(elm).clone(), newElm = $newElm[0].outerHTML;
              contents = contents.replace($.trim(newElm.replace('<script', '').replace('></script>', '')), 'src="' + $newElm.attr('data-main') + '.js"');
            }

          });

          // write out newly created file contents
          grunt.file.write(file, contents, 'utf-8');
        });
      });

      // check for callback, else mark as done
      if (isFunction(options.cb)) {
        options.cb();
      } else {
        options.done();
      }

    } else {

      // check for callback, else mark as done      
      if (isFunction(options.cb)) {
        options.cb();
      } else {
        options.done();
      }

    }
  });

  // helper to execute requirejs optimizer function
  grunt.registerHelper('almond', function (options) {
    // check if we should inline almond
    if (options.config.almond === true) {
      var npmDir = npm.dir,
          almondPath = npmDir + '/' + 'grunt-requirejs/node_modules/almond/',
          configClone = clone(options.config);

      // fetch the almond main file
      npm.load(JSON.parse(grunt.file.read(almondPath + 'package.json')), function (err, npmLocal) {
        
        // log almond including
        log.ok('Including almond.js');

        // set almond path
        configClone.paths.almond = String(almondPath + npmLocal.config.get('main')).replace('.js', '');

        // modify modules data
        configClone.modules.forEach(function (module, idx) {
          // log adding of almond
          grunt.verbose.ok('Adding almond to module: ' + module.name);

          // check if the module has its own includes
          // then append almond to them
          // else generate a new includes property
          if (isArray(module.include) === true) {
            configClone.modules[idx].include.push('almond');
          } else {
            configClone.modules[idx].include = ['almond'];
          }

          // check for callback, else mark as done           
          if (isFunction(options.cb)) {
            options.cb(configClone);
          } else {
            options.done();
          }

        });

      });

    } else {

      // check for callback, else mark as done
      if (isFunction(options.cb)) {
        options.cb();
      } else {
        options.done();
      }

    }
  });

  // Output some size info about a file.
  grunt.registerHelper('require_size_info', function(module, optimized, filecontents) {
    var gzipSize = String(grunt.helper('gzip', filecontents).length);
    grunt.log.writeln('Compressed size for module "' + module + '": ' + gzipSize.green + ' bytes gzipped (' + String(filecontents.length).green + ' bytes ' + (!!optimized !== false ? 'minified' : 'uncompressed') + ').');
  });

};