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

## Documentation

Example require js optimizer config entry:

```javascript
  requirejs: {
    mytarget: {
      options: {
        dir: 'build',
        appDir: 'src',
        baseUrl: 'js',
        paths: {
          underscore: '../vendor/underscore',
          jquery: '../vendor/jquery',
          backbone: '../vendor/backbone'
        }
      }
    }
  }
```

You see, there is no difference in declaring your require config when your using your Gruntfile
instead of using a separate requirejs config file.

## Almond
If you like to replace require.js with almond.js during the build process, grunt-requirejs comes with an [almond](https://github.com/jrburke/almond) injection mode.
It even can be used to convert your require script calls in your html files to call the 'almondyfied' module, instead of calling require.js
that then calls (e.g. loads) the module.

For more infos please take a look at the [Almond Integration](https://github.com/asciidisco/grunt-requirejs/blob/master/docs/almondIntegration.md) document

## Custom builds
For more infos please take a look at the [Using Custom Builds](https://github.com/asciidisco/grunt-requirejs/blob/master/docs/customBuilder.md) document

## Hybrid minification
For more infos please take a look at the [Using Hybrid Builds](https://github.com/asciidisco/grunt-requirejs/blob/master/docs/hybridbuilds.md) document

## Using custom r.js versions
For more infos please take a look at the [Using Custom r.js versions](https://github.com/asciidisco/grunt-requirejs/blob/master/docs/customrjs.md) document

## Using source maps
For more infos please take a look at the [Using Source Maps](https://github.com/asciidisco/grunt-requirejs/blob/master/docs/sourcemaps.md) document

## Examples
xxx

## Release History
Check the [Changleog](https://github.com/asciidisco/grunt-requirejs/blob/master/CHANGELOG) for more information

## Contributing
If you like to file an issue or submit a pull request, please check the [contributing guidelines](https://github.com/asciidisco/grunt-requirejs/blob/master/CONTRIBUTION.md)

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
