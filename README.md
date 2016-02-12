# crawl-fs [![Build Status](https://travis-ci.org/compulim/crawl-fs.svg?branch=master)](https://travis-ci.org/compulim/crawl-fs)

Recursively crawl a folder and returns a list of relative filenames.

## Usage

The following examples assume the folder structure looks like this:
```
./folder-to-crawl/abc.txt
./folder-to-crawl/def/ghi.txt
```

There are few ways to use `crawl-fs`.

### Returns an array

```javascript
require('crawl-fs')('folder-to-crawl/', (err, filenames) => {
  assert.deepEqual(
    filenames,
    [
      'abc.txt',
      'def/ghi.txt'
    ]
  );
});
```

### Returns a Promise with iterator callback

```javascript
require('crawl-fs').withIterator('folder-to-crawl/', filename => {
  // On first call
  assert.equal(filename, 'abc.txt');

  // On second call
  assert.equal(filename, 'def/ghi.txt');
}).then(() => {
  // Done
});
```

## Design considerations
If you think these design considerations are not valid, please [challenge](https://github.com/compulim/crawl-fs/issues/new/) us.
* We did not use Promise progression, instead, we prefer iterator pattern with Promise resolver as finisher
  * [Bluebird](http://bluebirdjs.com/docs/api/progression-migration.html) also discourage progression
* We did not implement ES6 generator
  * Our iterator is async, ES6 sync generator has no real benefits over array, in terms of time/space complexity

## Changelog
* 0.0.1 (2016-02-13) - Initial commit

## Wishlist
[ ] When async generator is official in ES7, we should add new `.withAsyncGenerator()` function

## Contribution

Want to contribute? There are few easy ways:
* Like us? Please [star](https://github.com/compulim/crawl-fs/stargazers) us!
* Want to make it even awesome? [Send us your wish](https://github.com/compulim/crawl-fs/issues/new/).
* Hate how it is working? [File an issue](https://github.com/compulim/crawl-fs/issues/) to us.