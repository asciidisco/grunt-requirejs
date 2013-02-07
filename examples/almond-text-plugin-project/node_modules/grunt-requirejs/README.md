# grunt-requirejs [![Build Status](https://secure.travis-ci.org/asciidisco/grunt-requirejs.png?branch=master)](http://travis-ci.org/asciidisco/grunt-requirejs)

> Optimize [require.js](http://requirejs.org/) based projects

## Getting Started
_If you haven't used [grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](https://github.com/cowboy/grunt/blob/master/docs/getting_started.md) guide._

From the same directory as your project's Gruntfile and package.json, install this plugin with the following command:

```bash
npm install grunt-requirejs
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-requirejs');
```

## Overview

Inside your `grunt.js` file add a section named `requirejs`. This section specifies the options passed to [RequireJS Optimizer](http://requirejs.org/docs/optimization.html).

### Parameters

#### options ```object```

This controls how this task (and its helpers) operate and should contain key:value pairs, see options below.

### Options

For a full list of possible options, [see the r.js example build file](https://github.com/jrburke/r.js/blob/master/build/example.build.js).

## Config Example

Example require js optimizer config entry:

```javascript
  requirejs: {
    compile: {
      options: {
        baseUrl: "path/to/base",
        mainConfigFile: "path/to/config.js",
        out: "path/to/optimized.js"
      }
    }
  }
```

You see, there is no difference in declaring your require config when your using your Gruntfile
instead of using a separate requirejs config file.

## Almond
_grunt-requirejs is capable of replacing require.js with almond.js automatically_

For more infos please take a look at the [Almond Integration](https://github.com/asciidisco/grunt-requirejs/blob/master/docs/almondIntegration.md) document

## Custom builds
_grunt-requirejs can generate custom jQuery, Lo-Dash & Backbone.js versions during the optimization_

For more infos please take a look at the [Using Custom Builds](https://github.com/asciidisco/grunt-requirejs/blob/master/docs/customBuilder.md) document

## Hybrid minification
_grunt-requirejs can minify your optimized output files using an hybrid strategy utilitizing uglifyjs & closure compiler_

For more infos please take a look at the [Using Hybrid Builds](https://github.com/asciidisco/grunt-requirejs/blob/master/docs/hybridBuilds.md) document

## Using custom r.js versions
_grunt-requirejs lets you specify a custom r.js for your build_

For more infos please take a look at the [Using Custom r.js versions](https://github.com/asciidisco/grunt-requirejs/blob/master/docs/customrjs.md) document

## Using source maps
_grunt-requirejs can generate sourcemaps when using the r.js v2.1.2 or higher_

For more infos please take a look at the [Using Source Maps](https://github.com/asciidisco/grunt-requirejs/blob/master/docs/sourcemaps.md) document

## Examples

There are some project & configuration examples to get you startet:

  - [libglobal](https://github.com/asciidisco/grunt-requirejs/tree/master/examples/libglobal)
  - [libglobal-hybrid](https://github.com/asciidisco/grunt-requirejs/tree/master/examples/libglobal-hybrid)
  - [multipage](https://github.com/asciidisco/grunt-requirejs/tree/master/examples/mutlipage)
  - [multipage-shim](https://github.com/asciidisco/grunt-requirejs/tree/master/examples/multipage-shim)


## Release History
Check the [Changleog](https://github.com/asciidisco/grunt-requirejs/blob/master/CHANGELOG) for more information

## Contributing
If you like to file an issue or submit a pull request, please check the [contributing guidelines](https://github.com/asciidisco/grunt-requirejs/blob/master/CONTRIBUTING.md)

## Contributors
Check the [AUTHORS File](https://github.com/asciidisco/grunt-requirejs/blob/master/AUTHORS.md) for more information

## Resources
+ [grunt](http://gruntjs.com/)
+ [Getting Started](https://github.com/cowboy/grunt/blob/master/docs/getting_started.md)
+ [requirejs](http://requirejs.org)
+ [almond](https://github.com/jrburke/almond)
+ [grunt-lodashbuilder](https://github.com/asciidisco/grunt-lodashbuilder)
+ [grunt-jquerybuilder](https://github.com/asciidisco/grunt-jquerybuilder)
+ [grunt-backbonebuilder](https://github.com/asciidisco/grunt-backbonebuilder)

## License
Copyright (c) 2012 Sebastian Golasch
Licensed under the [MIT license](https://github.com/asciidisco/grunt-requirejs/LICENSE-MIT).
