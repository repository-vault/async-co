"use strict";

var eachOfLimit = require('./eachOfLimit');

  //what did you expect..
module.exports = function (series, thunk){
  return eachOfLimit(series, 1, thunk);
};

