/*
 * grunt-compare-size
 * https://github.com/rwldrn/grunt-compare-size
 *
 * Copyright (c) 2012 Rick Waldron <waldron.rick@gmail.com>
 * Licensed under the MIT license.
 */

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

  // Compare size to master
  grunt.registerMultiTask( "compare_size", "Compare size of this branch to master", function() {
    var files = file.expandFiles( this.file.src ),
        done = this.async(),
        sizecache = __dirname + "/build/.sizecache.json",
        sources = {
          min: file.read( files[1] ),
          max: file.read( files[0] )
        },
        oldsizes = {},
        sizes = {};

    try {
      oldsizes = JSON.parse( file.read(sizecache) );
    } catch ( e ) {
      oldsizes = {};
    }

    // Obtain the current branch and continue...
    grunt.helper( "git_current_branch", function( err, branch ) {
      var key, diff;

      // Derived and adapted from Corey Frang's original `sizer`
      grunt.log.writeln( "Sizes - compared to master" );

      sizes[ files[0] ] = sources.max.length;
      sizes[ files[1] ] = sources.min.length;
      sizes[ files[1] + ".gz" ] = grunt.helper( "gzip", sources.min ).length;

      for ( key in sizes ) {
        diff = oldsizes[ key ] && ( sizes[ key ] - oldsizes[ key ] );
        if ( diff > 0 ) {
          diff = "+" + diff;
        }

        grunt.log.writetableln([ 8, 10, 30 ], [
          utils._.lpad( sizes[ key ], 8 ) ,
          utils._.lpad( diff ? "(" + diff + ")" : "(-)", 8 )[ diff[0] === "+" ? "yellow" : "red" ],
          key
        ]);
      }

      if ( branch === "master" ) {
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

  grunt.registerHelper("git_current_branch", function(done) {
    grunt.utils.spawn({
      cmd: "git",
      args: ["branch", "--no-color"]
    }, function(err, result) {
      var branch;

      result.split("\n").forEach(function(branch) {
        var matches = /^\* (.*)/.exec( branch );
        if ( matches != null && matches.length && matches[ 1 ] ) {
          done( null, matches[ 1 ] );
        }
      });
    });
  });
};
