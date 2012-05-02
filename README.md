# grunt-require

Use [@cowboys](https://github.com/cowboy) wonderful js based optimizer [grunt](https://github.com/cowboy/grunt) 
together with [@jrburkes](https://github.com/jrburke) [r.js](https://github.com/jrburke/r.js) optimizer,
to build your AMD based projects with grunt.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-requirejs`

Then add this line to your project's `grunt.js` gruntfile.

```javascript
task.loadNpmTasks('grunt-requirejs');
```


### Resources
[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
[requirejs]: http://requirejs.org

## Documentation
Load the grunt-requirejs task as described in 'Getting started' and add your r.js optimizer
configuration to your grunt file:

Example require js optimizer grunt file config entry: 

```javascript

// ... grunt file contents
 requirejs: {
      clearTarget: true,
      dir: 'build',
      appDir: 'src',
      baseUrl: 'js',
      paths: {
          underscore          : '../vendor/underscore',
          jquery              : '../vendor/jquery',
          backbone            : '../vendor/backbone'
      },
      pragmas: {
          doExclude: true
      },
      skipModuleInsertion: false,
      optimizeAllPluginResources: true,
      findNestedDependencies: true
    }

// ... even more grunt file contents
```

The only difference to the std. r.js optimization config is, that you can add a 'clearTarget' flag
to delete the contents of the target dir before building.

## Release History
### 0.1.0
+ Initial Release

## License
Copyright (c) 2012 asciidisco  
Licensed under the MIT license.