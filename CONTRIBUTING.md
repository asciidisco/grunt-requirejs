# Contributing to grunt-requirejs

## Filing issues
If something isn't working like you think it should, please read the documentation first.

The best way to ensure an issue gets addressed is to file it in the appropriate issues tracker.

### Simplify the issue
Try to [reduce your code](http://www.webkit.org/quality/reduction.html) to the bare minimum required to reproduce the issue. This makes it much easier (and much faster) to isolate and fix the issue.

### Explain the issue
If we can't reproduce the issue, we can't fix it. Please list the exact steps required to reproduce the issue. Include versions of your OS, Node.js, grunt, etc. Include relevant logs or sample code.

## Modifying grunt-requirejs
First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

1. Fork and clone the repo.
2. Check out the correct branch. Currently, the development happens in the `devel` branch.
3. Run `npm install` to install all grunt-requirejs dependencies.
4. Run `grunt travis` to test & lint the plugin.

Assuming that you don't see any red, you're ready to go. Just be sure to run `grunt` after making any changes, to ensure that nothing breaks.

### Submitting pull requests

1. Create a new branch, please don't work in your `master` or `devel` branch directly.
2. Add failing tests for the change you want to make. Run `grunt` to see the tests fail.
3. Fix stuff.
4. Run `grunt` to see if the tests pass. Repeat steps 2-4 until done.
5. Update the documentation to reflect any changes.
6. Push to your fork and submit a pull request.

### Adding tests
Tests are written in NodeUnit & QUnit style.
NodeUnit tests can be run using the ´grunt test´ command.
The tests from the examples directory can be run using ´grunt qunit´, but make sure
you are running ´grunt setUp´ before & ´grunt tearDown´ afterwards.

### Syntax

* Two space indents. Don't use tabs anywhere. Use `\t` if you need a tab character in a string.
* No trailing whitespace, except in markdown files where a linebreak must be forced.
* Don't go overboard with the whitespace.
* No more than [one assignment](http://benalman.com/news/2012/05/multiple-var-statements-javascript/) per `var` statement.
* Delimit strings with single-quotes `'`, not double-quotes `"`.
* Prefer `if` and `else` to ["clever"](http://programmers.stackexchange.com/a/25281) uses of `? :` conditional or `||`, `&&` logical operators.
* Comments are great. Just put them _before_ the line of code, _not_ at the _end_ of the line.
* **When in doubt, follow the conventions you see used in the source already.**
