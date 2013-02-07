{%= s.multi_task %}

When installed by npm, this plugin will automatically download and install [PhantomJS][] locally via the [grunt-lib-phantomjs][] library.

[PhantomJS]: http://www.phantomjs.org/
[grunt-lib-phantomjs]: https://github.com/gruntjs/grunt-lib-phantomjs

Also note that running grunt with the `--debug` flag will output a lot of PhantomJS-specific debugging information. This can be very helpful in seeing what actual URIs are being requested and received by PhantomJS.
