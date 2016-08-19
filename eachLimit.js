"use strict";


module.exports = function *(series, n, thunk) {
  var n = Math.min(n || 5, series.length);

  var ret = [];
  var index = 0;


  var next = function *() {
    if (index >= series.length)
      return;

    let i = index++;
    ret[i] = yield thunk(series[i]);

    yield next; //continue in lane
  }

  var lanes = [];
  while (n--)
    lanes.push(next);

  yield lanes;

  return ret;
};

