fs   = require "fs"
path = require "path"

gulp        = require "gulp"
gulpNodemon = require "gulp-nodemon"
log         = require "id-debug"

{
	enabled
	entryFilePath
	watchGlob
} = idProjectOptions.nodemon

watchNodemon = ->
	gulpNodemon
		#verbose: true
		script: entryFilePath
		watch:  watchGlob

gulp.task "nodemon:run", [ "compile" ], (cb) ->
	unless enabled is true
		log.info "Skipping nodemon:run: Disabled."
		return cb()

	watchNodemon()

	cb()

	return
