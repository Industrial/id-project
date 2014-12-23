A gulp based project structure and compilation automation.

## Installation

Install the required dependencies to run id-project with NPM.

```bash
$ npm install --save-dev id-project gulp coffee-script
```

## Usage

Running id-project should work with very little configuration. Right now the
policy is to enable all options by default.

1. Put a file named `gulpfile.coffee` in your project directory containing:

	```coffee
	idProject = require "id-project"
	idProject()
	```

2. Run the gulpfile from the commandline:

	```bash
	$ gulp
	```

	Or with debugging:

	```bash
	$ DEBUGGING=true gulp
	```

### Default directory structure

This is the directory structure the default options assume:

```
build/             # Output directory. Typically what you want to bundle with
                   # NPM and run.

docs/              # Generated documentation.

src/               # Input directory.

	client/          # Browser files.

		js/            # Browser JavaScript.

			app/         # Your app.

				app.coffee # The app entry point (for browserify).

	server/          # Server files.

		<anything>

test/              # Mocha unit tests.

app.js             # The server entry point. Generally starts something from
                   # the build/server/ directory.
```

### Default options

These options assume the default directory structure (but you can change it
to anything you like):

```coffee
idProject = require "id-project"

idProject
	browserify:
		enabled:             true
		entryFilePath:       "src/client/js/app/app.js"
		targetDirectoryPath: "build/client/js/app"
		targetFilename:      "app.bundle.js"

	clean:
		enabled:             true
		targetDirectoryPath: targetDirectoryPath

	coffee:
		enabled:             true
		sourceDirectoryPath: "src"
		targetDirectoryPath: "build"

	copy:
		enabled:             true
		excluded:            [ "!**/*.coffee", "!**/*.less" ]
		sourceDirectoryPath: "src"
		targetDirectoryPath: "build"

	documentation:
		enabled:             true
		sourceDirectoryPath: "src"
		targetDirectoryPath: "docs"

	less:
		enabled:             true
		entryFilePath:       "src/client/less/app.less"
		targetDirectoryPath: "build/client/css"

	livereload:
		enabled:             true

	forever:
		enabled:             true
		entryFilePath:       "app.js"
		watchDirectoryPath:  "build/server"

	tests:
		enabled:             true
		directoryPath:       "test"

	watch:
		enabled:             true
		sourceDirectoryPath: "src"
		testDirectoryPath:   "build"
```

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
