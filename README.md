Control flow for ES7 async/await with async.js (v2) signatures


[![Build Status](https://travis-ci.org/131/async-co.svg?branch=aa)](https://travis-ci.org/131/async-co)
[![Coverage Status](https://coveralls.io/repos/github/131/async-co/badge.svg?branch=aa)](https://coveralls.io/github/131/async-co?branch=aa)
[![Version](https://img.shields.io/npm/v/async-aa.svg)](https://www.npmjs.com/package/async-aa)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)


# Motivation
[async-aa](https://github.com/131/async-aa) provide javascript async/await equivalent signatures of the excellent [async](https://github.com/caolan/async) workflow library. 


Module are exported in standard commonJS module format and written in pure ES7 strict format. (no transpilation required nor used).
Use browserify if you need async-aa modules in a browser environnement.


**async-aa** is not a wrapper on **async**, but rather leverages the full potential of native async/await & promises contract. Code tend to be small & very efficient (far more simplier than using callbacks), just give [async-aa/queue.js](https://github.com/131/async-co/blob/master/queue.js) a look


## Addition to the async library signatures / promise pooling
* Generator cannot use arrow function binding style, yet it might be usefull to bind async-aa closure, therefore, you can use an extra optional args to all signature to set generator binding context. (i.e. as in native [.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) )
* Per design, it's easy to "throttle" a function that return a Promise ; checkout the "throttle" API for a way to make an ultra simple http request pooling.
* async logic allow async/each to iterate through array AND objects. Per design sanify, async-aa does not. Use each/eachLimit/eachSeries for array, eachOf/eachOfLimit/eachOfSeries for collections.

# API

## async-aa/eachLimit(arr, concurrency, *thunk [, thisobj])
Nothing special here
## async-aa/eachSeries(arr, *thunk [, thisobj] )
// = eachLimit concurrency = 1
## async-aa/each(arr, *thunk [, thisobj])
// = eachLimit concurrency = arr.length

## async-aa/eachOfLimit (dict, concurrency, *thunk [, thisobj])
Nothing special here neither

## async-aa/eachOfSeries(dict, *thunk [, thisobj])
 // = eachOfLimit concurrency = 1

## async-aa/eachOf(dict, *thunk [, thisobj])
// = eachOfLimit concurrency = dict.length


```
const eachLimit    = require('async-aa/eachLimit');

(async function *() {

  var stuffs = [1,2,3, 5, 7]

  await eachLimit(stuffs, 2, function*(id){
      await dootherStuffs(id);
  });

})();
```

## async-aa/setImmediate(fn)
Call a function in javascript next tick (using setImmediate API, or timeout 0 pollyfill)


## q = async-aa/queue(*thunk, concurrency)
Return a QueueObject you can push task into.
### await q.push(task)
Wait for thunk to process task (wait for worker, if needed)

```
const queue    = require('async-aa/queue');
const fetch    = require('node-fetch');

var q = queue(fetch, 1); //let's be nice

co(function *() {
  await q.push("http://example.com/stuff.json");
});

co(function *() {
  await q.push("http://example.com/otherstuff.json"); //will wait for stuff to be retrieved
});
```

## async-aa/throttle
Throttle any function that return a promise, sugar syntax helper for async-aa/queue


```
const throttle = require('async-aa/throttle');
var  fetch     = require('node-fetch');
fetch = throttle(fetch, 1); //make fetch behave nicely

co(function *() {
  await fetch("http://example.com/stuff.json");
});

co(function *() {
  await fetch("http://example.com/otherstuff.json"); //will wait for stuff.json to be retrieved
});
```
# Tests
async-aa is tested against async test suite.


# TODO
* Get rich or die tryin'
* write a working async-aa/cargo (see [the challenge on stackoverflow](http://stackoverflow.com/questions/39069624))

# Credits
* [131](https://github.com/131)
* not dependant upon, yet relying on [co](https://github.com/tj/co)
* inspired from the excellent [async](https://github.com/caolan/async)

## Alternatives / relatives
* [koa-async](https://github.com/eladnava/koa-async) ; a clever Promisify wrapper on top of async (but  not leveraging the full potential of ES7 async/await capabilities)
* [caolan/async/asyncify.js](https://github.com/caolan/async/blob/master/lib/asyncify.js) goes the same as koa-async.
* [es6-promise-pool](https://github.com/timdp/es6-promise-pool) ; equivalent to async-aa/queue, with a different API



# Shoutbox, keywords, SEO love
async/await, async-aa, promise, Promises, await, async, queue, map, throttle, "Let's have a beer & talk in Paris"



