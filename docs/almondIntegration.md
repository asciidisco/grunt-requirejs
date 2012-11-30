# Almond

## Including almond

```javascript
  requirejs: {
    myTaskDefinition: {
      options: {
          // *insert almond
          almond: true,
          dir: 'build',
          appDir: 'src',
          baseUrl: 'js',
          paths: {
            underscore: '../vendor/underscore',
            jquery    : '../vendor/jquery',
            backbone  : '../vendor/backbone'
          }
        }
      }
    }
```

## Including almond & replacing ´script´ tags in html sources

```javascript
  requirejs: {
    myTaskDefinition: {
      options: {
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
          }
        }
      }
    }
```

The only constraint for using the auto almond insertion is, that you at least define one module
(mostly named 'main').

## Special cases

### Special case, the 'out' property

If you define a special output name for your generated module file,
you have to specify a "modulePath" property inside your "replaceRequireScript" configuration

```javascript
  requirejs: {
    myTaskDefinition: {
      options: {
        almond: true,
        replaceRequireScript: [{
          files: ['index.html'],
          module: 'main',
          modulePath: '/js/main-build'
        }],
        baseUrl: 'js',
        paths: {
          'Handlebars': 'libs/Handlebars',
          'Backbone': 'libs/backbone',
          'underscore': 'libs/underscore',
          'json2': 'libs/json2',
        },
        out: 'js/main-build.js'
      }
    }
  }
```

### require function not found after almond integration
First occured in [issue #3](https://github.com/asciidisco/grunt-requirejs/issues/3).
You probably have to set

```javascript
  requirejs: {
    myTaskDefinition: {
      options: {
        wrap: true
      }
    }
  }
```

like described here: [https://github.com/jrburke/almond#usage](https://github.com/jrburke/almond#usage)
