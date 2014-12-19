log = require "id-debug"
lsr = require "lsr"

defaults = {}

sourceDirectoryPath = "src"
targetDirectoryPath = "build"
testDirectoryPath   = "test"

defaults.browserify =
	enabled:             true
	paths:               [ "#{targetDirectoryPath}/client/js/app" ]
	entryFilePath:       "#{targetDirectoryPath}/client/js/app/app.js"
	targetFilename:      "app.bundle.js"
	targetDirectoryPath: "#{targetDirectoryPath}/client/js/app"

defaults.clean =
	enabled:             true
	targetDirectoryPath: targetDirectoryPath

defaults.coffee =
	enabled:             true
	sourceDirectoryPath: sourceDirectoryPath
	targetDirectoryPath: targetDirectoryPath

defaults.copy =
	enabled:             true
	excluded:            [ "**/*.coffee", "**/*.less" ]
	sourceDirectoryPath: sourceDirectoryPath
	targetDirectoryPath: targetDirectoryPath

defaults.documentation =
	enabled:             true
	sourceDirectoryPath: sourceDirectoryPath
	targetDirectoryPath: targetDirectoryPath

defaults.less =
	enabled:             true
	entryFilePath:       "#{sourceDirectoryPath}/client/less/app.less"
	targetDirectoryPath: "#{targetDirectoryPath}/client/css"

defaults.livereload =
	enabled:             true

defaults.forever =
	enabled:             true
	entryFilePath:       "app.js"
	watchDirectoryPath:  sourceDirectoryPath

defaults.tests =
	enabled:             true
	directoryPath:       "test"

defaults.watch =
	enabled:             true
	sourceDirectoryPath: sourceDirectoryPath
	testDirectoryPath:   testDirectoryPath

applyDefaults = (options) ->
	for task, taskOptions of defaults
		if typeof taskOptions is "object"
			for k, v of taskOptions
				unless options[task]?
					options[task] = {}

				unless options[task][k]?
					options[task][k] = v
		else
			options[task] = taskOptions

module.exports = (options = {}) ->
	tasksDirectoryPath = "#{__dirname}/tasks"

	applyDefaults options

	global.idProjectOptions = options

	stats = lsr.sync tasksDirectoryPath

	for stat in stats
		unless stat.isDirectory()
			log.debug "Requiring module", stat.fullPath

			require stat.fullPath

	return
