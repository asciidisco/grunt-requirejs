# grunt-lodashbuilder

Simple grunt wrapper around the Lo-Dash builder.

[Lo-Dash](http://lodash.com/) was created & is maintained by
[John-David Dalton](http://allyoucanleet.com/), [Kit Cambridge](http://kitcambridge.github.com/) & [Mathias Bynens](http://mathiasbynens.be/)

This project is not associated with the people behind Lo-Dash (or Lo-Dash itself) in any way.

lodashbuilder only works with Lo-Dash version >= 0.7.0!

[![Build Status](https://secure.travis-ci.org/asciidisco/grunt-lodashbuilder.png?branch=master)](http://travis-ci.org/asciidisco/grunt-lodashbuilder)

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-lodashbuilder`

Then add this line to your project's `grunt.js` gruntfile.

```javascript
grunt.loadNpmTasks('grunt-lodashbuilder');
```

## Documentation
Load the grunt-lodashbuilder task as described in 'Getting started' and add your Lo-Dash builder
configuration to your grunt file:

Example Lo-Dash optimizer grunt file config entry:

```javascript
// ... grunt file contents
    lodash: {
      // modifiers for prepared builds
      // backbone, csp, legacy, mobile, strict, underscore
      modifier: 'backbone',
      // output location
      dest: 'build/lodash.build.js'
    },

// ... even more grunt file contents
```
As you might have guessed, this would produce the same output as

```shell
lodash backbone -o build/lodash.build.js
```

## All configuration options
```javascript
    lodash: {
      // modifiers for prepared builds
      // backbone, csp, legacy, mobile, strict, underscore
      modifier: 'backbone',
      // output location
      dest: 'build/lodash.build.js',
      // define a different Lo-Dash location
      // useful if you wanna use a different Lo-Dash version (>= 0.7.0)
      // by default, lodashbuilder uses always the latest version
      // of Lo-Dash (that was in npm at the time of lodashbuilders installation)
      src: 'node_modules/lodash',
      // More information can be found in the [Lo-Dash custom builds section](http://lodash.com/#custom-builds)
      category: ['collections', 'functions']
      exports: ['amd', 'commonjs', 'node']
      iife: '!function(window,undefined){%output%}(this)',
      include: ['each', 'filter', 'map']
      minus: ['result', 'shuffle']
      plus: ['random', 'template']
      template: './*.jst'
      settings: '{interpolate:/\\{\\{([\\s\\S]+?)\\}\\}/g}'
    }
```

## Contributing
If you like to file an issue or submit a pull request, please check the [contributing guidelines](https://github.com/asciidisco/grunt-lodashbuilder/blob/master/CONTRIBUTING.md)

## Contributors
Check the [AUTHORS File](https://github.com/asciidisco/grunt-lodashbuilder/blob/master/AUTHORS.md) for more information

## Release History
Take a look at the [Changelog](https://github.com/asciidisco/grunt-lodashbuilder/blob/master/CHANGELOG)

## Resources
+ [grunt](https://github.com/cowboy/grunt)
+ [Getting started](https://github.com/cowboy/grunt/blob/master/docs/getting_started.md)
+ [Lo-Dash](http://lodash.com/)

## License
Copyright (c) 2012 Sebastian Golasch
Licensed under the [MIT license](https://github.com/asciidisco/grunt-lodashbuilder/blob/master/LICENSE-MIT).
