'use strict';
var through = require('through2');
var minify = require('./lib/minify');

module.exports = function(uglify, logger) {
  return function(opts) {
    var minifier = minify(uglify, logger)(opts);
    return through.obj(async function(file, encoding, callback) {
      var newFile = null;
      var err = null;
      try {
        newFile = await minifier(file);
      } catch (e) {
        err = e;
      }
      callback(err, newFile);
    });
  };
};
