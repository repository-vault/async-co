"use strict";

const eachLimit = require('./eachLimit');

module.exports = function *(series, n, thunk, ctx) {

  var res = {};
  yield eachLimit(Object.keys(series), n, function* (k){
    res[k] = yield thunk.call(ctx || this, series[k], k);
  }, ctx);
  return res;
};

