"use strict";
var step_clock = Date.now(), start = step_clock;

var throttle = require('../throttle');
var co = require('co');

var floor = function(time) {
  return Math.floor(time/100);
}

var each = require('async-co/each');
var range= require('mout/array/range');

setInterval(function(){
  step_clock = Date.now();
}, 100);

var readClock = function (start, foo){
 // console.log("Foo is ", foo);
  return new Promise(function(resolve, reject){
    var time = step_clock - start;
    setTimeout(function(){
      resolve(time);
    }, 100);
  });
}

readClock = throttle(readClock, 5);

var time;
co(function * (){

  yield each(range(0,100),  function*(){
    time = yield readClock(start, "LOL");
    console.log("Time is", floor(time));
  });


}).catch(function(err){
  console.log("Failure in", err);
});
/*
var $ = require('jquery');

fetch  = throttle($.ajax, 5);
yield fetch("yahoo.fr");
yield fetch("yahoo.fr");
yield fetch("yahoo.fr");
yield fetch("yahoo.fr");
yield fetch("yahoo.fr");

*/