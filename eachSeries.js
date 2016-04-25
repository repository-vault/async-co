"use strict";

var eachLimit = require('./eachLimit');

  //what did you expect..
module.exports = function *(series, thunk){
  yield eachLimit(series, 1, thunk);
};

