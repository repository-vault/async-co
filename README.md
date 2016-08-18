Control flow for co with aync.js (v2) signatures

# API

## eachLimit(arr, concurrency, *thunk)
## eachSeries(arr, *thunk) // = eachLimit concurrency = 1
## each(arr, *thunk)       // = eachLimit concurrency = arr.length

## eachOfLimit (dict, concurrency, *thunk)
## eachOfSeries(dict, *thunk) // = eachOfLimit concurrency = 1
## eachOf(dict, *thunk)       // = eachOfLimit concurrency = dict.length
## 


```
var eachLimit    = require('async-co/eachLimit');

co(function *() {

  var stuffs = [1,2,3, 5, 7]

  yield eachLimit(stuffs, 2, function*(id){
      yield dootherStuffs(id);
  });

});


```

## eachSeries(arr, *thunk) 