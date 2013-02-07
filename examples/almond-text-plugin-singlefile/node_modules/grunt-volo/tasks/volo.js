/**
 * @license Copyright (c) 2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/volojs/grunt-volo for details
 */

/*jslint node: true */
'use strict';

console.log('LOADING VOLO');

module.exports = function (grunt) {
    grunt.registerTask('volo', 'Use volo to fetch code from GitHub', function () {
        var volo = require('volo'),
            args = this.args,
            //Tell grunt this is an async task.
            done = this.async();

        volo(args).then(function (okText) {
            if (okText) {
                grunt.log.ok(okText);
                done(true);
            }
        }, function (errText) {
            grunt.log.error('ERROR: ' + errText);
            done(false);
        });
    });
};
