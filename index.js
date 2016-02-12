'use strict';

const
  async = require('async'),
  fs = require('fs'),
  path = require('path');

function crawlWithArray(basePath, options, callback) {
  const
    argumentsLength = arguments.length,
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

  crawlWithIterator(basePath, options, item => outputs.push(item))
    .then(
      () => callback(null, outputs),
      err => callback(err)
    );
}

function crawlWithIterator(basePath, options, iterator) {
  const
    argumentsLength = arguments.length,
    pending = ['.'];

  if (!argumentsLength) {
    return;
  } else if (argumentsLength === 1) {
    basePath = process.cwd();
    options = null;
    iterator = arguments[0];
  } else if (argumentsLength === 2) {
    options = null;
    iterator = arguments[1];
  }

  options || (options = {});

  return new Promise((resolve, reject) => {
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
                  iterator(itemRelativePath);
                } else if (stat.isDirectory()) {
                  pending.push(itemRelativePath);
                }
              }

              callback(err);
            });
          }, callback);
        });
      },
      err => {
        err ? reject(err) : resolve();
      }
    );
  });
}

module.exports = crawlWithArray;
module.exports.withIterator = crawlWithIterator;