"use strict";

const eachLimit = require('./eachLimit');

module.exports = function *(series, thunk, ctx) {
  yield eachLimit(series, series.length, thunk, ctx);
};

