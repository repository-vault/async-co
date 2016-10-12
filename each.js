"use strict";

const eachLimit = require('./eachLimit');

module.exports = function *(series, thunk, ctx) {
  return yield eachLimit(series, series.length, thunk, ctx);
};

