/*
 * grunt-compare-size
 * https://github.com/rwldrn/grunt-compare-size
 *
 * Copyright (c) 2012 Rick Waldron <waldron.rick@gmail.com>
 * Licensed under the MIT license.
 */

// TODO: Allow for comparing to arbitrary checkouts/branches etc.
var path = require("path");

module.exports = function(grunt) {
  // Grunt utilities.
  var task = grunt.task;
  var file = grunt.file;
  var utils = grunt.utils;
  var log = grunt.log;
  var verbose = grunt.verbose;
  var fail = grunt.fail;
  var option = grunt.option;
  var config = grunt.config;
  var template = grunt.template;
  var sizecache = "dist/.sizecache.json";


  if ( !path.existsSync(sizecache) ) {
    file.write( sizecache, "" );
  }

  // Compare size to master
  grunt.registerMultiTask( "compare_size", "Compare size of this branch to master", function() {
    var files = file.expandFiles( this.file.src ),
        done = this.async(),
        sources = {
          min: file.read( files[1] ),
          max: file.read( files[0] )
        },
        firstuse = false,
        oldsizes = {},
        sizes = {};

    try {
      if ( path.existsSync(sizecache) ) {
        oldsizes = JSON.parse( file.read(sizecache) );
      }
    } catch ( e ) {}

    // `oldsizes` will now be one of:
    // {}, empty
    // { file: size [,...] }

    Object.keys(oldsizes).forEach(function( key ) {
      if ( oldsizes[key] === 0 ) {
        firstuse = true;
      }
    });

    // Obtain the current branch and continue...
    grunt.helper( "git_current_branch", function( err, branch ) {
      var key, diff, color;
      
      if ( err ) {
        grunt.log.error( err );
        return false;
      }

      // Derived and adapted from Corey Frang's original `sizer`
      grunt.log.writeln( "Sizes - compared to master" );

      sizes[ files[0] ] = sources.max.length;
      sizes[ files[1] ] = sources.min.length;
      sizes[ files[1] + ".gz" ] = grunt.helper( "gzip", sources.min ).length;

      for ( key in sizes ) {
        diff = oldsizes[ key ] && ( sizes[ key ] - oldsizes[ key ] );

        if ( diff > 0 ) {
          diff = "+" + diff;
          color = "red";
        }

        if ( diff < 0 ) {
          color = "green";
        }

        if ( !diff ) {
          diff = 0;
          color = "grey";
        }

        grunt.log.writetableln([ 12, 12, 55 ], [
          utils._.lpad( sizes[ key ], 10 ) ,
          utils._.lpad( diff ? "(" + diff + ")" : "(-)", 10 )[ color ],
          key
        ]);
      }

      if ( branch === "master" || firstuse ) {
        // If master, write to file - this makes it easier to compare
        // the size of your current code state to the master branch,
        // without returning to the master to reset the cache
        file.write( sizecache, JSON.stringify(sizes) );
      }
      done();
    });

    // Fail task if errors were logged.
    if ( this.errorCount ) {
      return false;
    }
  });

  grunt.registerHelper( "git_current_branch", function(done) {
    grunt.verbose.write( "Running `git branch` command..." );
    grunt.utils.spawn({
      cmd: "git",
      args: [ "branch", "--no-color" ]
    }, function(err, result) {
      var branch;

      if ( err ) {
        grunt.verbose.error();
        done( err );
        return;
      }

      result.split("\n").forEach(function(branch) {
        var matches = /^\* (.*)/.exec( branch );
        if ( matches != null && matches.length && matches[ 1 ] ) {
          grunt.verbose.ok();
          done( null, matches[ 1 ] );
        }
      });
    });
  });
};
