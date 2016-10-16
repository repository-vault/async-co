"use strict";

const assert = require('assert');
const expect = require('expect.js');
const sleep  = require('nyks/function/sleep');

const throttle  = require('../throttle');
const each  = require('../each');
const range  = require('mout/array/range');

const setImmediate = require('../setImmediate');

describe('throttle', function(){

  it('basics', function *() {

    var call_order = [];
    var delays = [40,20,60,20];


    var current = 0;
      //begin async walker
    var walk = function () {
      current ++;
      if(current >= 20)
        return;
      setImmediate(walk);
    };

    var q = throttle(function * (task) {
      if(current == 0)
        walk();
      yield new Promise(setImmediate);
      return current;
    }, 2);


    var result = yield each(range(1, 10), q);

    expect(result).to.eql([2,2, 3,3, 4,4, 5,5, 6,6]);
  });



});

