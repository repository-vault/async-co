"use strict";

const setImmediate  = require('./setImmediate');
const values        = require('mout/object/values');
const keys          = require('mout/object/keys');

module.exports = function *(series, n, thunk, ctx) {

  var isArray = Array.isArray(series);
  var iterateeSource = isArray ? series: values(series);
  var iterateeKeys   = keys(series)

  var n = Math.min(n || 5, iterateeSource.length);


  var ret = isArray ? [] : {};
  var index = 0;
  var cancel = false; 

  var next = function *() {
    if (index >= iterateeSource.length || cancel)
      return;

    let i = index++;
    
      //force async HERE, so we MIGHT stop replenishing after error
    yield new Promise(setImmediate);

    try { //stop replenishing after error
      ret[ isArray ? i  : iterateeKeys[i] ] = yield thunk.call(ctx || this, iterateeSource[i]);
    } catch(err) {
      cancel = true;
      throw err;
    }

    yield next; //continue in lane
  }

  var lanes = [];
  while (n--)
    lanes.push(next);

  yield lanes;

  return ret;
};

