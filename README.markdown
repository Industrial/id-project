A gulp based project structure and compilation automation.

# Features

## Clean
Cleans the build directory.

## CoffeeScript
Compiles CoffeeScript files to JavaScript files and places them in the build
directory.

## Less
Compiles Less files starting from an entry file to one Cascading Style Sheet
file and places it in the build directory.

## Copy
Copies any file that is not a CoffeeScript file or Less file and places it in
the build directory.

## Documentation
Generates API documentation for all CoffeeScript files in the source directory.
Uses the [Codo](https://github.com/coffeedoc/codo) system.

## [Browserify](https://github.com/substack/node-browserify)
Compiles the outputted JavaScript files from the CoffeeScript task and Jade
files copied over with the Copy task to one javascript file called the bundle.

## Nodemon
Starts a server in development mode and keeps watch over server files. When an
outputted JavaScript file from the CoffeeScfipt task in the build directory
changes, it restarts the server.

## Tests
Runs assertion tests with the [Mocha](http://visionmedia.github.io/mocha/) test
runner.

## Watch
When any file in the source directory changes, this task sends a message to the
corresponding tasks, triggering another compile/copy/etc of the subject files.

## Livereload
Starts a [LiveReload](http://livereload.com/) server. When a file changes that
affects the browser, sends a message to the livereload server, reloading the
browser.