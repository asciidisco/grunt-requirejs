# Sourcemaps

Sourcemaps can be used like described in the [requirejs docs](http://requirejs.org/docs/optimization.html#sourcemaps)

Note: Make sure to set the optimize property to ´uglify2´!

## Example

```javascript
    requirejs: {
      mysourcemapped: {
        options: {
          baseUrl: 'my/project',
          name: 'project',
          out: 'dist/main-sourcemapped.js',
          optimize: 'uglify2',
          generateSourceMaps: true,
          preserveLicenseComments: false,
          useSourceUrl: true
        }
    },
```
