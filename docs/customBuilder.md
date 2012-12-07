# Custom builder support

grunt-requirejs supports multiple custom build options, based on the functionality of already available grunt plugins

## Options

### builder ```object``` (optional)

This property is used to define the custom build options


### builder:alias ```string``` (optional)

The alias property of each custom build task lets you define the library that should
be replaced with the custom build.

For example, if you like tp replace uinderscore.js with a custom lodash.js build,
alias the lodash builder with ```alias: 'underscore'```.
If not set, the builders default to 'jquery', 'backbone' & 'lodash'.


## General information

```javascript
  requirejs: {
    mytarget: {
      options: {
        // create a custom jQuery build
        // this will be inlined in the optimizers output file
        builder: {
          jQuery: {
            exclude: ['css']
          }
        },
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
  }
```

## Lo-Dash

See all available options [here](https://github.com/asciidisco/grunt-lodashbuilder)

```javascript
  builder: {
    lodash: {
      modifier: 'backbone',
      alias: 'underscore'
    }
  }
```

## jQuery

See all available options [here](https://github.com/asciidisco/grunt-jquerybuilder)

```javascript
  builder: {
    jquery: {
      exclude: ['deprecated', 'effects']
    }
  }
```

## Backbone

See all available options [here](https://github.com/asciidisco/grunt-backbonebuilder)

```javascript
  builder: {
    backbone: {
      include: ['Collection', 'Model', 'View', 'Events']
    }
  }
```

## Using multiple builds at once

```javascript
  builder: {
    lodash: {
      modifier: 'backbone',
      alias: 'underscore'
    },
    jquery: {
      exclude: ['deprecated', 'effects']
    },
    backbone: {
      include: ['Collection', 'Model', 'View', 'Events']
    }
  }
```
