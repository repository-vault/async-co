Control flow ala ES7 async/await using  ES6 generator (thanks to [tj/co](https://github.com/tj/co)) with async.js (v2) signatures

# Motivation
[async-co](https://github.com/131/async-co) provide javascript async/await (through ES6 generator & co) equivalent signatures of the excellent [async](https://github.com/caolan/async) workflow library. 

Thanks to co async/await & promises contract, code tend to be small & very efficient (far more simplier than using callbacks), just give [async-co/queue.js](https://github.com/131/async-co/blob/master/queue.js) a look


## Addition to the async library signatures / promise pooling
Per design, it's easy to "throttle" a function that return a Promise ; checkout the "throttle" API for a way to make an ultra simple http request pooling.


# API

## async-co/eachLimit(arr, concurrency, *thunk)
Nothing special here
## async-co/eachSeries(arr, *thunk)
// = eachLimit concurrency = 1
## async-co/each(arr, *thunk)
// = eachLimit concurrency = arr.length

## async-co/eachOfLimit (dict, concurrency, *thunk)
Nothing special here neither

## async-co/eachOfSeries(dict, *thunk)
 // = eachOfLimit concurrency = 1

## async-co/eachOf(dict, *thunk)
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



# TODO
* Get rich or die tryin'

# Credits
* [131](https://github.com/131)
* not dependant upon, yet relying on [co](https://github.com/tj/co)
* inspired from the excellent [async](https://github.com/caolan/async)

## Alternatives / relatives
* [koa-async](https://github.com/eladnava/koa-async) ; a clever Promisify wrapper on top of async (but  not leveraging the full potential of ES7 async/await capabilities)
* [es6-promise-pool](https://github.com/timdp/es6-promise-pool) ; equivalent to async-co/queue, with a different API



# Shoutbox, keywords, SEO love
async/await, ES6 generators, co, async-co, promise, Promises, yield, async, queue, map, throttle, "Let's have a beer & talk in Paris"



