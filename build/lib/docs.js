var cp, docs;

cp = require("child_process");

docs = function(sourcePath, targetPath, exit, cb) {
  var childProcess;
  childProcess = cp.spawn("" + __dirname + "/../../node_modules/.bin/codo", ["--output", targetPath, "--undocumented", "--private", sourcePath]);
  childProcess.stderr.on("data", function(chunk) {
    return process.stderr.write(chunk);
  });
  return childProcess.once("close", function() {
    if (exit) {
      return process.exit();
    } else {
      return cb();
    }
  });
};

module.exports = docs;
