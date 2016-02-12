'use strict';

const
  assert = require('assert'),
  async = require('async'),
  crawlfs = require('../index'),
  fs = require('fs'),
  path = require('path'),
  basePath = path.resolve(module.filename, '../crawl-with-iterator-test-files/');

function runAsPromise(path, options) {
  const result = [];

  return new Promise((resolve, reject) => {
    crawlfs.withIterator(path, options, item => {
      result.push(item);
    }).then(
      () => resolve(result),
      err => reject(err)
    );
  });
}

describe('Crawl with iterator', () => {
  describe('crawlWithIterator() on non-empty folder', () => {
    it('should iterates over files', done => {
      let numCalled = 0;

      crawlfs.withIterator(path.resolve(basePath, 'non-empty/'), filename => {
        numCalled === 0 && assert.equal(filename, 'abc.txt');
        numCalled === 1 && assert.equal(filename, `def${path.sep}ghi.txt`);
        numCalled++;
      }).then(() => {
        assert.equal(numCalled, 2);
        done();
      });
    });
  });

  describe('crawlWithIterator() on empty folder', () => {
    it('should not iterates', done => {
      const targetPath = path.resolve(basePath, 'empty/');

      fs.mkdir(targetPath, err => {
        assert(!err || err.code === 'EEXIST');

        runAsPromise(targetPath)
          .then(result => {
            assert.deepEqual(result, []);
            done();
          });
      });
    });
  });

  describe('crawlWithIterator() on folder with only subfolders', () => {
    it('should not iterates', done => {
      const targetPath = path.resolve(basePath, 'only-folders/');

      fs.mkdir(targetPath, err => {
        assert(!err || err.code === 'EEXIST');

        fs.mkdir(path.resolve(targetPath, 'abc'), err => {
          assert(!err || err.code === 'EEXIST');

          runAsPromise(targetPath)
            .then(result => {
              assert.deepEqual(result, []);
              done();
            });
        });
      });
    });
  });

  describe('crawlWithIterator() on non-existent folder', () => {
    it('should throws ENOENT', done => {
      runAsPromise(path.resolve(basePath, 'non-existent/'))
        .catch(err => {
          assert(err.code === 'ENOENT');
          done();
        });
    });
  });
});