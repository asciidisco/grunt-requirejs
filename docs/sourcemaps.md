# Sourcemaps

## Example

```javascript
    requirejs: {
      mysourcemapped: {
        options: {
          baseUrl: 'my/project',
          name: 'project',
          out: 'dist/main-sourcemapped.js',
          optimize: "uglify2",
          generateSourceMaps: true,
          preserveLicenseComments: false,
          useSourceUrl: true
        }
    },
```
