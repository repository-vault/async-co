"use strict";

const eachLimit = require('./eachLimit');

  //what did you expect..
module.exports = function (series, thunk, ctx){
  return eachLimit(series, 1, thunk, ctx);
};

