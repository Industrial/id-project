fs   = require "fs"
path = require "path"

gulp           = require "gulp"
gulpLivereload = require "gulp-livereload"
log            = require "id-debug"
vinylSource    = require "vinyl-source-stream"
watchify       = require "watchify"

entryFilePath   = "./build/client/js/app/index.js"
targetDirectory = "./build/client/js/app"
options         = idProjectOptions

gulp.task "browserify:watch", [ "browserify:compile", "livereload:run" ], (cb) ->
	unless options.browserify is true and options.watch is true
		log.info "Skipping browserify:watch: Disabled."
		return cb()

	fs.exists entryFilePath, (exists) ->
		unless exists
			log.info "Skipping browserify:watch: File `#{entryFilePath}` not found."
			return cb()

		bundler = watchify
			entries: [ entryFilePath ]
			extensions: [ ".js", ".json", ".jade" ]

		bundler.transform "jadeify"
		bundler.transform "debowerify"

		compile = ->
			bundle = bundler.bundle debug: true

			bundle.on "error", log.error.bind log

			bundle
				.pipe vinylSource "app.bundle.js"
				.pipe gulp.dest targetDirectory
				.pipe gulpLivereload auto: false

		bundler.on "update", compile

		# Needed for watchify to start watching..
		compile()

		return

	return