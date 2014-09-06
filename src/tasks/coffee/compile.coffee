path = require "path"

gulp       = require "gulp"
gulpCoffee = require "gulp-coffee"
gulpTap    = require "gulp-tap"
log        = require "id-debug"

options             = idProjectOptions.coffee
enabled             = options.enabled
sourceDirectoryPath = path.resolve options.sourceDirectoryPath
targetDirectoryPath = path.resolve options.targetDirectoryPath

gulp.task "coffee:compile", (cb) ->
	unless enabled is true
		log.info "Skipping coffee:compile: Disabled."
		return cb()

	coffeeCompiler = gulpCoffee bare: true

	coffeeCompiler.on "error", log.error.bind log

	log.debug "coffee:compile: Looking for `#{sourceDirectoryPath}/**/*.coffee`."

	gulp.src "#{sourceDirectoryPath}/**/*.coffee"
		.pipe gulpTap (file) ->
			log.debug "coffee:compile: Compiling `#{file.path}` into `#{targetDirectoryPath}`."
			return

		.pipe coffeeCompiler
		.pipe gulp.dest targetDirectoryPath
		.on "end", cb

	return
