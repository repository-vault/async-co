"use strict";

const eachLimit = require('./eachLimit');

module.exports = function *(series, thunk) {
  yield eachLimit(series, series.length, thunk);
};

