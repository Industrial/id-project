var enabled, entryFilePath, fs, gulp, gulpLivereload, gulpTap, log, options, path, targetDirectoryPath, targetFilename, vinylSource, watchEnabled, watchify;

fs = require("fs");

path = require("path");

gulp = require("gulp");

gulpTap = require("gulp-tap");

gulpLivereload = require("gulp-livereload");

log = require("id-debug");

vinylSource = require("vinyl-source-stream");

watchify = require("watchify");

options = idProjectOptions.browserify;

enabled = options.enabled;

entryFilePath = path.resolve(options.entryFilePath);

targetDirectoryPath = path.resolve(options.targetDirectoryPath);

targetFilename = options.targetFilename;

watchEnabled = idProjectOptions.watch.enabled;

gulp.task("browserify:watch", ["browserify:compile", "livereload:run"], function(cb) {
  if (!(enabled === true && watchEnabled === true)) {
    log.info("Skipping browserify:watch: Disabled.");
    return cb();
  }
  log.debug("[browserify:watch] Entry file: `" + entryFilePath + "`.");
  log.debug("[browserify:watch] Target directory path: `" + targetDirectoryPath + "`.");
  log.debug("[browserify:watch] Target filename: `" + targetFilename + "`.");
  fs.exists(entryFilePath, function(exists) {
    var bundler, compile;
    if (!exists) {
      log.info("[browserify:watch] Entry file `" + entryFilePath + "` not found.");
      return cb();
    }
    bundler = watchify({
      paths: options.paths,
      entries: [entryFilePath],
      extensions: [".coffee", ".js", ".json", ".jade"]
    });
    bundler.transform("cjsxify");
    bundler.transform("jadeify");
    bundler.transform("debowerify");
    compile = function() {
      var bundle;
      bundle = bundler.bundle({
        debug: true
      });
      bundle.on("error", log.error.bind(log));
      return bundle.pipe(vinylSource(targetFilename)).pipe(gulpTap(function(file) {
        log.debug("[browserify:watch] Compiled `" + file.path + "`.");
      })).pipe(gulp.dest(targetDirectoryPath)).pipe(gulpLivereload({
        auto: false
      }));
    };
    bundler.on("update", compile);
    compile();
  });
});
