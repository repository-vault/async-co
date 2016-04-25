"use strict";

var thread = require('co-thread');

module.exports = function *(series, n, thunk){
  var n = Math.min(n || 5, series.length);
  var ret = [];
  var index = 0;

  function *next() {
    var i = index++;
    ret[i] = yield thunk(series[i]);

    if (index < series.length) yield next;
  }

  yield thread(next, n);

  return ret;
};

