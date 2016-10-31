"use strict";

const eachOfLimit = require('./eachOfLimit');

module.exports = function *(series, thunk, ctx) {
  return yield eachOfLimit(series, Object.keys(series).length, thunk, ctx);
};

