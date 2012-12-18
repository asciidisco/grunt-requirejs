# Hybrid builds

Inspired by [Lo-Dashs](http://lodash.com/) custom build strategy, grunt-requirejs
can minify your output with uglify & closure-compiler, checking which version is the smallest.

## Options

### optimize ```string```

Optimizes a the builder output with ulgify, closure-compiler & a combination of both optimizers,
checking which is the smallest output file & using this.

Note: Sometimes closure-compilers screws up your files, use this optimizer strategy with caution.

## Example

```javascript
    requirejs: {
      mysourcemapped: {
        options: {
          baseUrl: 'my/project',
          name: 'project',
          out: 'dist/main.js',
          optimize: 'hybrid'
        }
    },
```
