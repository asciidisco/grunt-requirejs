# Using custom r.js versions

Normally, grunt-requirejs instruments the latest r.js version to build your project.
If you need to build your project against an older r.js version, you can do so by adding
the special ´rjs´ option.

## Options

### rjs ```string``` (optional)

This is used to define a path to a custom r.js version

If you´re custom requirejs npm module is stored under ```node_modules/requirejs```,
the rjs property should point to that folder.


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
