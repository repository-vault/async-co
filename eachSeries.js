"use strict";

const eachLimit = require('./eachLimit');

  //what did you expect..
module.exports = function (series, thunk){
  return eachLimit(series, 1, thunk);
};

