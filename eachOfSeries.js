"use strict";

const eachOfLimit = require('./eachOfLimit');

  //what did you expect..
module.exports = function (series, thunk, ctx){
  return eachOfLimit(series, 1, thunk, ctx);
};

