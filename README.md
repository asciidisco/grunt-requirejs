# grunt-requirejs [![Build Status](https://secure.travis-ci.org/asciidisco/grunt-requirejs.png?branch=master)](http://travis-ci.org/asciidisco/grunt-requirejs)

> Optimize [require.js](http://requirejs.org/) based projects

## Getting Started
_If you haven't used [grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](https://github.com/cowboy/grunt/blob/master/docs/getting_started.md) guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

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
```

You see, there is no difference in declaring your require config when your using your Gruntfile
instead of using a separate requirejs config file.

## Almond
If you like to replace require.js with almond.js during the build process, grunt-requirejs comes with an
experimental [almond](https://github.com/jrburke/almond) injection mode. It even converts your require
script calls in your html files to call the 'almondyfied' module, instead of calling require.js
that then calls (e.g.) loads the module.

The only constraint for using the auto almond insertion is, that you at least define one module
(mostly named 'main').

```javascript
// ... grunt file contents
 requirejs: {
    std: {
          // almond specific contents
          // *insert almond in all your modules
          almond: true,
          // *replace require script calls, with the almond modules
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
    }
// ... even more grunt file contents
```
### Special case, the 'out' property

If you define a special output name for your generated module file,
you have to specify a "modulePath" property inside your "replaceRequireScript" configuration

```javascript
requirejs: {
    std: {
        almond: true,
        replaceRequireScript: [{
            files: ['index.html'],
            module: 'main',
            modulePath: '/js/main-build'
        }],
        baseUrl: "js",
        paths: {
            'Handlebars': 'libs/Handlebars',
            'Backbone': 'libs/backbone',
            'underscore': 'libs/underscore',
            'json2': 'libs/json2',
        },
        out: 'js/main-build.js'
    }
}
```

### require function not found after almond integration
First occured in [issue #3](https://github.com/asciidisco/grunt-requirejs/issues/3).
You probably have to set

```javascript
requirejs: {
    std: {
        wrap: true
    }
}
```

like described here: [https://github.com/jrburke/almond#usage](https://github.com/jrburke/almond#usage)

## Contributing
If you like to file an issue or submit a pull request, please check the [contributing guidelines](https://github.com/asciidisco/grunt-requirejs/blob/master/CONTRIBUTION.md)

## Release History
Check the [Changleog](https://github.com/asciidisco/grunt-requirejs/blob/master/CHANGELOG) for more information

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
Copyright (c) 2012 asciidisco
Licensed under the [MIT license](https://github.com/asciidisco/grunt-requirejs/LICENSE-MIT).
