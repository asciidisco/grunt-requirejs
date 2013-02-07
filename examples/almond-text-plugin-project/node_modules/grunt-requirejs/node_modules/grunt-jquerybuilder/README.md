# grunt-jquerybuilder

Simple grunt wrapper around the [jquery-builder](https://github.com/jgallen23/jquery-builder) from [@jgallen23](https://github.com/jgallen23).

[![Build Status](https://secure.travis-ci.org/asciidisco/grunt-jquerybuilder.png?branch=master)](http://travis-ci.org/asciidisco/grunt-jquerybuilder)

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-jquerybuilder`

Then add this line to your project's `grunt.js` gruntfile.

```javascript
grunt.loadNpmTasks('grunt-jquerybuilder');
```

### Resources

+ [grunt](https://github.com/cowboy/grunt)
+ [getting_started](https://github.com/cowboy/grunt/blob/master/docs/getting_started.md)
+ [jquery-builder](https://github.com/jgallen23/jquery-builder)

## Documentation
Load the grunt-jquerybuilder task as described in 'Getting started' and add your jQuery builder
configuration to your grunt file:

Example jQuery builder grunt file config entry:

```javascript
// ... grunt file contents
    jquery: {
      // the parts you want to exclude from your build
      // possible values ['ajax', 'css', 'deprecated', 'dimensions', 'effects', 'offset']
      exclude: ['ajax'],
      // the jQuery version (currently only 1.8.3 is supported) - defaults to 1.8.3
      version: '1.8.3',
      // output location (relative to your grunt.js file location)
      dest: 'build/jquery.custom.js',
      // minify the output (true or false) - defaults to false
      minify: false
    },
// ... even more grunt file contents
```
As you might have guessed, this would produce the same output as

```shell
grunt custom:-ajax
```

## Release History
### 0.1.2
+ Fixed filename reference in package.json

### 0.1.1
+ Housekeeping (README additions, log output, etc.)

### 0.1.0
+ Initial Release

## License
Copyright (c) 2012 asciidisco
Licensed under the MIT license.