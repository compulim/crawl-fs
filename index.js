'use strict';

const
  async = require('async'),
  fs = require('fs'),
  path = require('path');

function crawlAsArray(basePath, options, callback) {
  const
    argumentsLength = arguments.length,
    pending = ['.'],
    outputs = [];

  if (!argumentsLength) {
    return;
  } else if (argumentsLength === 1) {
    basePath = process.cwd();
    options = null;
    callback = arguments[0];
  } else if (argumentsLength === 2) {
    options = null;
    callback = arguments[1];
  }

  options || (options = {});

  async.whilst(
    () => pending.length,
    callback => {
      const
        workingRelativePath = pending.shift(),
        workingFullPath = path.resolve(basePath, workingRelativePath);

      fs.readdir(workingFullPath, (err, items) => {
        if (err) { return callback(err); }

        async.forEach(items, (item, callback) => {
          fs.stat(path.resolve(workingFullPath, item), (err, stat) => {
            if (!err) {
              const itemRelativePath = path.join(workingRelativePath, item);

              if (stat.isFile()) {
                outputs.push(itemRelativePath);
              } else if (stat.isDirectory()) {
                pending.push(itemRelativePath);
              }
            }

            callback(err);
          });
        }, callback);
      });
    },
    err => callback(err, err ? null : outputs)
  );
}

module.exports = crawlAsArray;
