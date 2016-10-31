Control flow ala ES7 async/await using  ES6 generator (thanks to [tj/co](https://github.com/tj/co)) with async.js (v2) signatures


[![Build Status](https://travis-ci.org/131/async-co.svg?branch=master)](https://travis-ci.org/131/async-co)
[![Coverage Status](https://coveralls.io/repos/github/131/async-co/badge.svg?branch=master)](https://coveralls.io/github/131/async-co?branch=master)
[![Version](https://img.shields.io/npm/v/async-co.svg)](https://www.npmjs.com/package/async-co)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)


# Motivation
[async-co](https://github.com/131/async-co) provide javascript async/await (through ES6 generator & co) equivalent signatures of the excellent [async](https://github.com/caolan/async) workflow library. 


Module are exported in standard commonJS module format and written in pure ES5/ES6 strict format. (no transpilation required nor used).
Use browserify if you need async-co modules in a browser environnement.


**async-co** is not a wrapper on **async**, but rather leverages the full potential of native async/await & promises contract. Code tend to be small & very efficient (far more simplier than using callbacks), just give [async-co/queue.js](https://github.com/131/async-co/blob/master/queue.js) a look


## Addition to the async library signatures / promise pooling
* Generator cannot use arrow function binding style, yet it might be usefull to bind async-co closure, therefore, you can use an extra optional args to all signature to set generator binding context. (i.e. as in native [.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) )
* Per design, it's easy to "throttle" a function that return a Promise ; checkout the "throttle" API for a way to make an ultra simple http request pooling.
* async logic allow async/each to iterate through array AND objects. Per design sanify, async-co does not. Use each/eachLimit/eachSeries for array, eachOf/eachOfLimit/eachOfSeries for collections.

# API

## async-co/eachLimit(arr, concurrency, *thunk [, thisobj])
Nothing special here
## async-co/eachSeries(arr, *thunk [, thisobj] )
// = eachLimit concurrency = 1
## async-co/each(arr, *thunk [, thisobj])
// = eachLimit concurrency = arr.length

## async-co/eachOfLimit (dict, concurrency, *thunk [, thisobj])
Nothing special here neither

## async-co/eachOfSeries(dict, *thunk [, thisobj])
 // = eachOfLimit concurrency = 1

## async-co/eachOf(dict, *thunk [, thisobj])
// = eachOfLimit concurrency = dict.length


```
const eachLimit    = require('async-co/eachLimit');

co(function *() {

  var stuffs = [1,2,3, 5, 7]

  yield eachLimit(stuffs, 2, function*(id){
      yield dootherStuffs(id);
  });

});
```

## async-co/setImmediate(fn)
Call a function in javascript next tick (using setImmediate API, or timeout 0 pollyfill)


## q = async-co/queue(*thunk, concurrency)
Return a QueueObject you can push task into.
### yield q.push(task)
Wait for thunk to process task (wait for worker, if needed)

```
const queue    = require('async-co/queue');
const fetch    = require('node-fetch');

var q = queue(fetch, 1); //let's be nice

co(function *() {
  yield q.push("http://example.com/stuff.json");
});

co(function *() {
  yield q.push("http://example.com/otherstuff.json"); //will wait for stuff to be retrieved
});
```

## async-co/throttle
Throttle any function that return a promise, sugar syntax helper for async-co/queue


```
const throttle = require('async-co/throttle');
var  fetch     = require('node-fetch');
fetch = throttle(fetch, 1); //make fetch behave nicely

co(function *() {
  yield fetch("http://example.com/stuff.json");
});

co(function *() {
  yield fetch("http://example.com/otherstuff.json"); //will wait for stuff.json to be retrieved
});
```
# Tests
async-co is tested against async test suite.


# TODO
* Get rich or die tryin'
* write a working async-co/cargo (see [the challenge on stackoverflow](http://stackoverflow.com/questions/39069624))

# Credits
* [131](https://github.com/131)
* not dependant upon, yet relying on [co](https://github.com/tj/co)
* inspired from the excellent [async](https://github.com/caolan/async)

## Alternatives / relatives
* [koa-async](https://github.com/eladnava/koa-async) ; a clever Promisify wrapper on top of async (but  not leveraging the full potential of ES7 async/await capabilities)
* [caolan/async/asyncify.js](https://github.com/caolan/async/blob/master/lib/asyncify.js) goes the same as koa-async.
* [es6-promise-pool](https://github.com/timdp/es6-promise-pool) ; equivalent to async-co/queue, with a different API



# Shoutbox, keywords, SEO love
async/await, ES6 generators, co, async-co, promise, Promises, yield, async, queue, map, throttle, "Let's have a beer & talk in Paris"



