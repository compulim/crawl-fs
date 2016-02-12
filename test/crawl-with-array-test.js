const
  assert = require('assert'),
  async = require('async'),
  crawlfs = require('../index'),
  fs = require('fs'),
  path = require('path'),
  basePath = path.resolve(module.filename, '../crawl-with-array-test-files/');

describe('Crawl with array', () => {
  describe('crawlWithArray() on non-empty folder', () => {
    it('should returns an array of files', done => {
      crawlfs(path.resolve(basePath, 'non-empty/'), (err, result) => {
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

  describe('crawlWithArray() on empty folder', () => {
    it('should returns an empty array', done => {
      const targetPath = path.resolve(basePath, 'empty/');

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

  describe('crawlWithArray() on folder with only subfolders', () => {
    it('should returns an empty array', done => {
      const targetPath = path.resolve(basePath, 'only-folders/');

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

  describe('crawlWithArray() on non-existent folder', () => {
    it('should throws ENOENT', done => {
      crawlfs(path.resolve(basePath, 'non-existent/'), err => {
        assert(err && err.code === 'ENOENT');
        done();
      });
    });
  });
});