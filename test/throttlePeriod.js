"use strict";

const assert = require('assert');
const expect = require('expect.js');
const sleep  = require('nyks/function/sleep');

const throttlePeriod  = require('../throttlePeriod');
const each  = require('../each');
const range  = require('mout/array/range');

const setImmediate = require('../setImmediate');

describe('throttlePeriod', function(){

    this.timeout(10 * 1000);
  it('basics', function *() {

    var call_order = [];
    var delays = [40,20,60,20];


    var results = {}, a=0, b=0;

    var fn = function * (c) {
      results[a++] = c;
  
    }

    var p = throttlePeriod(fn, 1000);

    yield each(range(1, 10), function *(){
      yield p(b++);
    });



    expect(results).to.eql({0:0, 1: 9});


  });

  it('with no period', function *() {

    var call_order = [];
    var delays = [40,20,60,20];


    var results = {}, a=0, b=0;

    var d=0;
    var fn = function * (c) {
      d++;
      results[a++] = c;
  
    }

    var p = throttlePeriod(fn);


    setImmediate(function(){
      d++;
    });

    yield each(range(1, 10), function *(){
      yield p(b++);
    });


    expect(results).to.eql({0:0, 1: 9});


  });



});

