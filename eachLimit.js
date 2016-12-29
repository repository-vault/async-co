"use strict";

const setImmediate  = require('./setImmediate');

module.exports = function *(series, n, thunk, ctx) {
  var n = Math.min(n || 5, series.length);

  var ret = [];
  var index = 0;
  var cancel = false; 

  var next = function *() {
    if (index >= series.length || cancel)
      return;

    let i = index++;
    
      //force async HERE, so we MIGHT stop replenishing after error
    yield new Promise(setImmediate);

    try { //stop replenishing after error
      ret[i] = yield thunk.call(ctx || this, series[i], i);
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

