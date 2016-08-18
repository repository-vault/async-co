"use strict";


module.exports = function *(series, n, thunk) {
  var n = Math.min(n || 5, series.length);

  let ret = [];
  let index = 0;


  let next = function *() {
    if (index >= series.length)
      return;

    let i = index++;
    ret[i] = yield thunk(series[i]);

    yield next; //continue in lane
  }

  let lanes = [];
  while (n--)
    lanes.push(next);

  yield lanes;

  return ret;
};

