# Custom builder support

_grunt-requirejs supports multiple custom build options_

## General information

```javascript
  requirejs: {
    mytarget: {
      options: {
        // create a custom jQuery build
        // this will be inlined in the optimizers output file
        builder: {
          jQuery: {
            excude: ['css']
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

```javascript
  builder: {
    lodash: {
      modifier: 'backbone',
      alias: 'underscore'
    }
  }
```

## jQuery

```javascript
  builder: {
    jquery: {
      exclude: ['deprecated', 'effects']
    }
  }
```

## Backbone

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
