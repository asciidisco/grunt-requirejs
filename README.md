# WARNING

The plugin is currently broken in the not officially released, but available via npm version 0.2.0.
Please use version 0.1.0 explicitly if you need a working instance!

# grunt-require

Use [@cowboys](https://github.com/cowboy) wonderful js based optimizer [grunt](https://github.com/cowboy/grunt) 
together with [@jrburkes](https://github.com/jrburke) [r.js](https://github.com/jrburke/r.js) optimizer,
to build your AMD based projects with grunt.

Now with [almond](https://github.com/jrburke/almond) goodness.

## Upgrade warning
I removed the 'clearTarget' config option from the plugin, because i want you all
to go to [grunt-contrib](https://github.com/gruntjs/grunt-contrib) page and use their
'clean' task instead!

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
[almond]: https://github.com/jrburke/almond
[grunt-contrib]: https://github.com/gruntjs/grunt-contrib

## Documentation
Load the grunt-requirejs task as described in 'Getting started' and add your r.js optimizer
configuration to your grunt file:

Example require js optimizer grunt file config entry: 

```javascript

// ... grunt file contents
 requirejs: {
      dir: 'build',
      appDir: 'src',
      baseUrl: 'js',
      paths: {
          underscore: '../vendor/underscore',
          jquery    : '../vendor/jquery',
          backbone  : '../vendor/backbone'
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

You see, there is no difference in declaring your require config when your using your gruntfile
instead of using a separate requirejs config file.

## Almond
If you like to replace require.js with almond.js during the build process, grunt-requirejs comes with an
experimental [almond](https://github.com/jrburke/almond) injection mode. It even converts your require 
<script> calls in your html files to call the "almondyfied" module, instead of calling require.js 
that then calls (e.g.) loads the module.

The only constraint for using the auto almond insertion is, that you at least define one module
(mostly named as 'main').

// ... grunt file contents
 requirejs: {
      // almond specific contents
      // *insert almond in all your modules
      almond: true,
      // *replace require <script> calls, with the almond modules
      // in the following files 
      replaceRequireScript: [{
        files: ['build/index.html'],
        module: 'main'
      }],
      // "normal" require config
      // *create at least a 'main' module
      // thats necessary for using the almond auto insertion
      modules: [{name: 'main'}],      
      dir: 'build',
      appDir: 'src',
      baseUrl: 'js',
      paths: {
          underscore: '../vendor/underscore',
          jquery    : '../vendor/jquery',
          backbone  : '../vendor/backbone'
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

## Release History
### 0.2.0
+ Removed clearTarget (use grunt-contrib clean instead)
+ Added [almond](https://github.com/jrburke/almond) integration
+ Added automatic almond js module script tag replacement for html files
+ Imporoved documentation
### 0.1.0
+ Initial Release

## License
Copyright (c) 2012 asciidisco  
Licensed under the MIT license.