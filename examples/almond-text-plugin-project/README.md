# grunt-requirejs/example/almond-text-plugin-project

> This project shows how to set up a project requirejs-based project that has the following goals:

*

## Installation

Clone the git-repo or download this project and run `npm install`.
It fetches all the needed node dependecies as well as the frontend vendor libs using volo.

## Project layout

This project has the following layout:

* **src**: The code that runs in the browser while in development mode.
* **dist**: Generated after an optimizer build. Contains the built code that can be deployed to the live site.
* **node_modules**:
* **.editorconfig**:
* **.jshintrc**:
* **Gruntfile.js**:
* **package.json**:

This **src** has the following layout:

* **index.html**: The index page
* **js**
    * **app**: the directory to store app-specific modules.
    * **lib**: the directory to hold third party modules, like jQuery.
    * **main.js**: contains the requirejs config, and it will be the build target for the set of common modules.

To optimize, run:

    `grunt`

That build command creates an optimized version of the project in a
**dist** directory.


## More info

For more information on the optimizer:
http://requirejs.org/docs/optimization.html

For more information on using requirejs:
http://requirejs.org/docs/api.html

For more information on grunt:
http://gruntjs.org

For more information on volo:
http://volojs.org
