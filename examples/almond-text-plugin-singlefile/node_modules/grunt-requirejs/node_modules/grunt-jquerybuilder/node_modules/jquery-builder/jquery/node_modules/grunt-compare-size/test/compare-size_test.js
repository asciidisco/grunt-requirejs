var grunt = require("grunt"),
    file = require("fs"),
    path = require("path"),
    sizecache = "./dist/.sizecache.json",
    dummy = { "dist/source.js": 0, "dist/source.min.js": 0, "dist/source.min.js.gz": 0 },
    saved = grunt.file.read(sizecache);

// console.log( path.existsSync(sizecache) );


// Set .sizecache.json entries to zero
grunt.file.write(
  sizecache,
  JSON.stringify( dummy )
);

exports["compare_size"] = {
  "execution": function( test ) {

    grunt.utils.spawn({
      cmd: "grunt",
      args: [ "compare_size" ]
    }, function( err, result ) {
      var output = result.toString(),
          lines = output.split("\n").map(function( val ) { return val.trim(); });

      console.log( "\n\nOUTPUT:\n" + output );

      test.ok( /Sizes - compared to/.test(output), "Sizes - compared to" );

      lines.forEach(function( line ) {
        if ( /source/.test(line) ) {
          test.equal( typeof +line.split(/\s+/g)[0], "number", "Expecting numeric sizes" );
        }
      });

      Object.keys( dummy ).forEach(function( key ) {
        test.ok( (new RegExp( key )).test( output ), "Displayed file name: " + key );
      });
      test.done();
    });
  },

  "aftermath": function( test ) {
    grunt.utils.spawn({
      cmd: "git",
      args: [ "branch", "--no-color" ]
    }, function( err, result ) {
      var branch,
          branches = result.split("\n"),
          saved = JSON.parse( grunt.file.read( sizecache ) );

      branch = branches.filter(function(branch) {
        var matches = /^\* (.*)/.exec( branch );
        if ( matches != null && matches.length && matches[ 1 ] ) {
          return matches[ 1 ];
        }
      })[ 0 ];

      branch = branch.replace(/^\* /, "");

      // compare_size only write when on master
      if ( branch === "master" ) {
        Object.keys( saved ).forEach(function( key ) {
          test.ok( saved[ key ], "Size is not zero: " + key );
        });
      }
      test.done();
    });
  },

  "reboot": function( test ) {

    // Delete the sizecache file
    // Retry the task
    file.unlink(sizecache, function() {
      grunt.utils.spawn({
        cmd: "grunt",
        args: [ "compare_size" ]
      }, function( err, result ) {
        var output = result.toString(),
            lines = output.split("\n").map(function( val ) { return val.trim(); });

        console.log( "\n\nOUTPUT:\n" + output );

        test.ok( /Sizes - compared to/.test(output), "Sizes - compared to" );

        lines.forEach(function( line ) {
          if ( /source/.test(line) ) {
            test.equal( typeof +line.split(/\s+/g)[0], "number", "Expecting numeric sizes" );
          }
        });

        Object.keys( dummy ).forEach(function( key ) {
          test.ok( (new RegExp( key )).test( output ), "Displayed file name: " + key );
        });
        test.done();
      });
    });
  }
};


// ./node_modules/.bin/grunt test
