# grunt-volo

Use [volo](https://github.com/volojs) inside
[grunt](https://github.com/cowboy/grunt) for fetching code dependencies from
GitHub.

## Getting Started

Install this grunt plugin next to your project's
[grunt.js gruntfile](https://github.com/cowboy/grunt/blob/master/docs/getting_started.md) with:

    npm install grunt-volo

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-volo');
```

## Documentation

Use volo to fetch code from GitHub:

### add

    grunt volo:add:jquery

This will add jquery to the current project.

    grunt volo:add:documentcloud/underscore/master

adds the documentcloude/underscore's master branch version of underscore to
the current project.

See the [volo's add README](https://github.com/volojs/volo/blob/master/commands/add/doc.md)
for all the add options. Just use `:` instead of space to separate arguments
for grunt.

### search

    grunt volo:search:backbone

Searches GitHub for a backbone code dependency.

## License

MIT
