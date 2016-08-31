"use strict";

const eachOfLimit = require('./eachOfLimit');

module.exports = function *(series, thunk, ctx) {
  yield eachOfLimit(series, Object.keys(series).length, thunk, ctx);
};

