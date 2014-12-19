var applyDefaults, defaults, log, lsr, sourceDirectoryPath, targetDirectoryPath, testDirectoryPath;

log = require("id-debug");

lsr = require("lsr");

defaults = {};

sourceDirectoryPath = "src";

targetDirectoryPath = "build";

testDirectoryPath = "test";

defaults.browserify = {
  enabled: true,
  paths: ["" + targetDirectoryPath + "/client/js/app"],
  entryFilePath: "" + targetDirectoryPath + "/client/js/app/app.js",
  targetFilename: "app.bundle.js",
  targetDirectoryPath: "" + targetDirectoryPath + "/client/js/app"
};

defaults.clean = {
  enabled: true,
  targetDirectoryPath: targetDirectoryPath
};

defaults.coffee = {
  enabled: true,
  sourceDirectoryPath: sourceDirectoryPath,
  targetDirectoryPath: targetDirectoryPath
};

defaults.copy = {
  enabled: true,
  excluded: ["**/*.coffee", "**/*.less"],
  sourceDirectoryPath: sourceDirectoryPath,
  targetDirectoryPath: targetDirectoryPath
};

defaults.documentation = {
  enabled: true,
  sourceDirectoryPath: sourceDirectoryPath,
  targetDirectoryPath: targetDirectoryPath
};

defaults.less = {
  enabled: true,
  entryFilePath: "" + sourceDirectoryPath + "/client/less/app.less",
  targetDirectoryPath: "" + targetDirectoryPath + "/client/css"
};

defaults.livereload = {
  enabled: true
};

defaults.forever = {
  enabled: true,
  entryFilePath: "app.js",
  watchDirectoryPath: sourceDirectoryPath
};

defaults.tests = {
  enabled: true,
  directoryPath: "test"
};

defaults.watch = {
  enabled: true,
  sourceDirectoryPath: sourceDirectoryPath,
  testDirectoryPath: testDirectoryPath
};

applyDefaults = function(options) {
  var k, task, taskOptions, v, _results;
  _results = [];
  for (task in defaults) {
    taskOptions = defaults[task];
    if (typeof taskOptions === "object") {
      _results.push((function() {
        var _results1;
        _results1 = [];
        for (k in taskOptions) {
          v = taskOptions[k];
          if (options[task] == null) {
            options[task] = {};
          }
          if (options[task][k] == null) {
            _results1.push(options[task][k] = v);
          } else {
            _results1.push(void 0);
          }
        }
        return _results1;
      })());
    } else {
      _results.push(options[task] = taskOptions);
    }
  }
  return _results;
};

module.exports = function(options) {
  var stat, stats, tasksDirectoryPath, _i, _len;
  if (options == null) {
    options = {};
  }
  tasksDirectoryPath = "" + __dirname + "/tasks";
  applyDefaults(options);
  global.idProjectOptions = options;
  stats = lsr.sync(tasksDirectoryPath);
  for (_i = 0, _len = stats.length; _i < _len; _i++) {
    stat = stats[_i];
    if (!stat.isDirectory()) {
      log.debug("Requiring module", stat.fullPath);
      require(stat.fullPath);
    }
  }
};
