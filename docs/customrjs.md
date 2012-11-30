# Using custom r.js versions

## Example

```javascript
    requirejs: {
      mysourcemapped: {
        options: {
          rjs: '/path/to/my/custom/requirejs/version'
          baseUrl: 'my/project',
          name: 'project',
          out: 'dist/main-sourcemapped.js'
        }
    },
```
