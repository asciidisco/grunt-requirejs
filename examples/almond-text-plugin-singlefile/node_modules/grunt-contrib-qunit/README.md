# grunt-contrib-qunit [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-qunit.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-qunit)

> Run QUnit unit tests in a headless PhantomJS instance.

_Note that this plugin has not yet been released, and only works with the latest bleeding-edge, in-development version of grunt. See the [When will I be able to use in-development feature 'X'?](https://github.com/gruntjs/grunt/blob/devel/docs/faq.md#when-will-i-be-able-to-use-in-development-feature-x) FAQ entry for more information._

## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-contrib-qunit --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## Qunit task
_Run this task with the `grunt qunit` command._

_This task is a [multi task][] so any targets, files and options should be specified according to the [multi task][] documentation._
[multi task]: https://github.com/gruntjs/grunt/wiki/Configuring-tasks


When installed by npm, this plugin will automatically download and install [PhantomJS][] locally via the [grunt-lib-phantomjs][] library.

[PhantomJS]: http://www.phantomjs.org/
[grunt-lib-phantomjs]: https://github.com/gruntjs/grunt-lib-phantomjs

Also note that running grunt with the `--debug` flag will output a lot of PhantomJS-specific debugging information. This can be very helpful in seeing what actual URIs are being requested and received by PhantomJS.

### Options

#### timeout
Type: `Number`  
Default: `5000`

The amount of time (in milliseconds) that grunt will wait for a QUnit `start()` call before failing the task with an error.

#### inject
Type: `String`  
Default: (built-in)

Path to an alternate QUnit-PhantomJS bridge file to be injected. See [the built-in bridge](https://github.com/gruntjs/grunt-contrib-qunit/blob/master/phantomjs/bridge.js) for more information.

#### (-- PhantomJS arguments)
Type: `String`  
Default: (none)

Additional `--` style arguments that need to be passed in to PhantomJS may be specified as options, like `{'--option': 'value'}`. This may be useful for specifying a cookies file, local storage file, or a proxy. See the [PhantomJS API Reference][] for a list of `--` options that PhantomJS supports.

### Usage examples

#### Wildcards
In this example, `grunt qunit:all` (or `grunt qunit` because `qunit` is a [multi task][]) will test all `.html` files in the test directory _and all subdirectories_. First, the wildcard is expanded to match each individual file. Then, each matched filename is converted to the appropriate `file://` URI. Finally, each URI is passed to [PhantomJS][] (one at a time).

```js
// Project configuration.
grunt.initConfig({
  qunit: {
    all: ['test/**/*.html']
  }
});
```

#### Testing via http:// or https://
In circumstances where running unit tests from `file://` URIs is inadequate, you can specify `http://` or `https://` URIs instead. If `http://` or `https://` URIs have been specified, those URIs will be passed directly to [PhantomJS][], as-specified.

In this example, `grunt qunit` will test two files, served from the server running at `localhost:8000`.

```js
// Project configuration.
grunt.initConfig({
  qunit: {
    all: ['http://localhost:8000/test/foo.html', 'http://localhost:8000/test/bar.html']
  }
});
```

#### Using the grunt-contrib-connect plugin
It's important to note that grunt does not automatically start a `localhost` web server. That being said, the [grunt-contrib-connect plugin][] `connect` task can be run before the `qunit` task to serve files via a simple [connect][] web server.

[grunt-contrib-connect plugin]: https://github.com/gruntjs/grunt-contrib-connect
[connect]: http://www.senchalabs.org/connect/

In the following example, if a web server isn't running at `localhost:8000`, running `grunt qunit` with the following configuration will fail because the `qunit` task won't be able to load the specified URIs. However, running `grunt connect qunit` will first start a static [connect][] web server at `localhost:8000` with its base path set to the Gruntfile's directory. Then, the `qunit` task will be run, requesting the specified URIs.

```js
// Project configuration.
grunt.initConfig({
  qunit: {
    all: ['http://localhost:8000/test/foo.html', 'http://localhost:8000/test/bar.html']
  },
  connect: {
    server: {
      options: {
        port: 8000,
        base: '.'
      }
    }
  }
});

// This plugin provides the "connect" task.
grunt.loadNpmTasks('grunt-contrib-connect');

// A convenient task alias.
grunt.registerTask('test', ['connect', 'qunit']);
```

#### Custom timeouts and PhantomJS options
In the following example, the default timeout value of `5000` is overridden with the value `10000` (timeout values are in milliseconds). Additionally, PhantomJS will read stored cookies from the specified file. See the [PhantomJS API Reference][] for a list of `--` options that PhantomJS supports.

[PhantomJS API Reference]: https://github.com/ariya/phantomjs/wiki/API-Reference

```js
// Project configuration.
grunt.initConfig({
  qunit: {
    options: {
      timeout: 10000,
      '--cookies-file': 'misc/cookies.txt'
    },
    all: ['test/**/*.html']
  }
});
```

#### Events and reporting
[QUnit callback](http://api.qunitjs.com/category/callbacks/) methods and arguments are also emitted through grunt's event system so that you may build custom reporting tools. Please refer to to the QUnit documentation for more information.

The events (with arguments) are as follows:

* `qunit.begin`
* `qunit.moduleStart`: name
* `qunit.testStart`: name
* `qunit.log`: result, actual, expected, message, source
* `qunit.testDone`: name, failed, passed, total
* `qunit.moduleDone`: name, failed, passed, total
* `qunit.done`: failed, passed, total, runtime

In addition to QUnit callback-named events, the following event is emitted when [PhantomJS][] is spawned for a test:

* `qunit.spawn`: url

You may listen for these events like so:

```js
grunt.event.on('qunit.spawn', function (url) {
  grunt.log.ok("Running test: " + url);
});
```


## Release History

 * 2012-10-04   v0.1.0   Work in progress, not yet officially released.

---

Task submitted by ["Cowboy" Ben Alman](http://benalman.com/)

*This file was generated on Mon Dec 10 2012 16:42:20.*
