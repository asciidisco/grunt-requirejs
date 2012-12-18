# grunt-requirejs [![Build Status](https://secure.travis-ci.org/asciidisco/grunt-requirejs.png?branch=master)](http://travis-ci.org/asciidisco/grunt-requirejs)

> Building require.js based applications with grunt


## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-requirejs --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## Requirejs task
_Run this task with the `grunt requirejs` command._

_This task is a [multi task][] so any targets, files and options should be specified according to the [multi task][] documentation._
[multi task]: https://github.com/gruntjs/grunt/wiki/Configuring-tasks


#### Almond
_grunt-requirejs is capable of replacing require.js with almond.js automatically_

For more infos please take a look at the [Almond Integration](https://github.com/asciidisco/grunt-requirejs/blob/master/docs/almondIntegration.md) document

#### Custom builds
_grunt-requirejs can generate custom jQuery, Lo-Dash & Backbone.js versions during the optimization_

For more infos please take a look at the [Using Custom Builds](https://github.com/asciidisco/grunt-requirejs/blob/master/docs/customBuilder.md) document

#### Hybrid minification
_grunt-requirejs can minify your optimized output files using an hybrid strategy utilitizing uglifyjs & closure compiler_

For more infos please take a look at the [Using Hybrid Builds](https://github.com/asciidisco/grunt-requirejs/blob/master/docs/hybridBuilds.md) document

#### Using custom r.js versions
_grunt-requirejs lets you specify a custom r.js for your build_

For more infos please take a look at the [Using Custom r.js versions](https://github.com/asciidisco/grunt-requirejs/blob/master/docs/customrjs.md) document

#### Using source maps
_grunt-requirejs can generate sourcemaps when using the r.js v2.1.2 or higher_

For more infos please take a look at the [Using Source Maps](https://github.com/asciidisco/grunt-requirejs/blob/master/docs/sourcemaps.md) document

#### Examples

There are some project & configuration examples to get you startet:

  - [libglobal](https://github.com/asciidisco/grunt-requirejs/tree/master/examples/libglobal)
  - [libglobal-hybrid](https://github.com/asciidisco/grunt-requirejs/tree/master/examples/libglobal-hybrid)
  - [multipage](https://github.com/asciidisco/grunt-requirejs/tree/master/examples/mutlipage)
  - [multipage-shim](https://github.com/asciidisco/grunt-requirejs/tree/master/examples/multipage-shim)

#### Resources
+ [grunt](http://gruntjs.com/)
+ [Getting Started](https://github.com/cowboy/grunt/blob/master/docs/getting_started.md)
+ [requirejs](http://requirejs.org)
+ [almond](https://github.com/jrburke/almond)
+ [grunt-lodashbuilder](https://github.com/asciidisco/grunt-lodashbuilder)
+ [grunt-jquerybuilder](https://github.com/asciidisco/grunt-jquerybuilder)
+ [grunt-backbonebuilder](https://github.com/asciidisco/grunt-backbonebuilder)




## Release History

 * 2012-12-27   v0.3.2   Fixes
 * 2012-12-13   v0.3.1   Fixes Fixes Fixes Examples are now converted to grunt 0.4.0
 * 2012-12-03   v0.3.0   Major refactoring Support for custom builds Support for hybrid builds Support for custom requirejs versions Now multitask Support for removeCombined
 * 2012-10-01   v0.2.14   fixes package.json dependecy versions
 * 2012-10-01   v0.2.13   fixes according to the changes from the last cheerio release
 * 2012-09-25   v0.2.12   fixes issue of r.js almond-based dependency mixup (added by @chrissrogers)
 * 2012-09-13   v0.2.11   Fixed issue Added example projects
 * 2012-09-10   v0.2.10   Fixed issue Fixed issue
 * 2012-07-10   v0.2.9   Removed jQuery dependency and replaced it with cheerio Updated versions of 3rd party libs
 * 2012-05-29   v0.2.8   RequireJS Version bump to 2.0
 * 2012-05-29   v0.2.7   Removed npm dependency for tracing the almond file Added some informations in the readme about the almond 'wrap=true'
 * 2012-05-21   v0.2.6   Added 'modulePath' configuration option for specifying your modules path Added 'modulePath' documentation
 * 2012-05-20   v0.2.5   Added dual config Optimized almond integration (removed npm dependency) Readme updates requirejs isnt a multi task anymore
 * 2012-05-08   v0.2.0   Removed clearTarget (use grunt-contrib clean instead) Added [almond](https://github.com/jrburke/almond) integration Added automatic almond js module script tag replacement for html files Improved documentation
 * 2012-04-23   v0.1.0   Initial Release

---

Task submitted by [Sebastian Golasch](http://github.com/asciidisco)

*This file was generated on Tue Dec 18 2012 13:47:52.*
