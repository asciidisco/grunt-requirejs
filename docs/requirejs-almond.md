# Almond

If you like to replace require.js with almond.js during the build process, grunt-requirejs comes with an [almond](https://github.com/jrburke/almond) injection mode.
It even can be used to convert your require script calls in your html files to call the 'almondyfied' module, instead of calling require.js
that then calls (e.g. loads) the module.

## Options

### almond ```boolean``` (optional)

This is used indicate if grunt-requirejs should include almond in your combined js file.


### replaceRequireScript ```array``` (optional)

This is used to define the files where the script tag attributes should be replaced
and which modules should be taken into account.

## Including almond

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

grunt-requirejs is also capable of automatically changing the src attribute
in your html script tags.

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
