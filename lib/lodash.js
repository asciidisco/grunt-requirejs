/*global exports:true, require:true */

/*
 * grunt-require
 * https://github.com/asciidisco/grunt-requirejs
 *
 * Copyright (c) 2012 asciidisco
 * Licensed under the MIT license.
 */

(function () {
  'use strict';

  exports.init = function(grunt) {
    var exports = {};

    // Collect & output some size info about a file
    exports.lodashify = function(options) {
      var lodashbuilder = require(require.resolve('grunt-lodashbuilder').replace('grunt.js', '') + '/lib/builder.js');
      var lodash = lodashbuilder.init(grunt);

      if (options.config.builder && options.config.builder.lodash) {
        grunt.log.writeln('Running Lo-Dash custom build');
        lodash.build({config: options.config.builder.lodash, debug: true}, function (transport) {
          // display error
          if (transport.type === 'error') {
            grunt.log.error(transport.content);
          }

          // proceed with file content
          if (transport.type === 'content') {
            // prepare builder transport
            if (!options.config.__builderOutput) options.config.__builderOutput = [];
            options.config.__builderOutput.push({
              name: 'lodash',
              alias: (options.config.builder.lodash.alias ? options.config.builder.lodash.alias : 'lodash'),
              content: transport.content
            });

            // call the almondify callback helper
            options.cb({
                config: options.config,
                done: options.done,
                cb: options.Helper.optimize(options.config, options.done, options.Helper.replaceAlmond(options.config, options.done))
            });
          }

        });
      } else {
        // call the almondify callback helper
        options.cb({
            config: options.config,
            done: options.done,
            cb: options.Helper.optimize(options.config, options.done, options.Helper.replaceAlmond(options.config, options.done))
        });
      }

      // return traced informations
      return true;
    };

    return exports;
  };

}).call(this);