const
  assert = require('assert'),
  async = require('async'),
  crawlfs = require('../index'),
  fs = require('fs'),
  path = require('path');

describe('Crawl as array', () => {
  describe('crawlAsArray() on non-empty folder', () => {
    it('should returns an array of files', done => {
      crawlfs(path.resolve(module.filename, '../1-crawl-test-files/non-empty/'), (err, result) => {
        assert(!err);
        assert.deepEqual(
          result,
          [
            'abc.txt',
            'def' + path.sep + 'ghi.txt'
          ]
        );

        done();
      });
    });
  });

  describe('crawlAsArray() on empty folder', () => {
    it('should returns an empty array', done => {
      const targetPath = path.resolve(module.filename, '../1-crawl-test-files/empty/');

      fs.mkdir(targetPath, err => {
        assert(!err || err.code === 'EEXIST');

        crawlfs(targetPath, (err, result) => {
          assert(!err);
          assert.deepEqual(result, []);

          done();
        });
      });
    });
  });

  describe('crawlAsArray() on folder with only subfolders', () => {
    it('should returns an empty array', done => {
      const targetPath = path.resolve(module.filename, '../1-crawl-test-files/only-folders/');

      fs.mkdir(targetPath, err => {
        assert(!err || err.code === 'EEXIST');

        fs.mkdir(path.resolve(targetPath, 'abc'), err => {
          assert(!err || err.code === 'EEXIST');

          crawlfs(targetPath, (err, result) => {
            assert(!err);
            assert.deepEqual(result, []);

            done();
          });
        });
      });
    });
  });

  describe('crawlAsArray() on non-existent folder', () => {
    it('should throws ENOENT', done => {
      crawlfs(path.resolve(module.filename, '../1-crawl-test-files/non-existent/'), err => {
        assert(err && err.code === 'ENOENT');
        done();
      });
    });
  });
});