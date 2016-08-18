"use strict";

const eachLimit = require('./eachLimit');

module.exports = function *(series, n, thunk){

  yield eachLimit(Object.keys(series), n, function* (k){
    yield thunk(series[k], k);
  });
};

