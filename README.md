# crawl-fs

Recursively crawl a folder and returns a list of relative filenames.

## Usage

The following examples assume the folder structure looks like this:
```
./folder-to-crawl/abc.txt
./folder-to-crawl/def/ghi.txt
```

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

## Contribution

Want to contribute? There are few easy ways:
* Like us? Please [star](stargazers) us!
* Want to make it even awesome? [Send us your wish](issues/new/).
* Hate how it is working? [File an issue](issues/) to us.