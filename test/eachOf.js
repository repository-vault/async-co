"use strict";

const assert = require('assert');
const expect = require('expect.js');
const sleep  = require('nyks/function/sleep');

const eachOf = require('../eachOf');
const eachOfSeries = require('../eachOfSeries');
const eachOfLimit = require('../eachOfLimit');


describe("eachOf", function() {

  function eachOfNoCallbackIteratee(done, x, key, callback) {
    expect(x).to.equal(1);
    expect(key).to.equal("a");
    callback();
    done();
  }

  function * eachOfIteratee(args, value, key) {
    args.push(key, value);
    yield sleep(value*25);
  }


  it('eachOf', function *() {
    var args = [];
    yield eachOf({ a: 1, b: 2 }, eachOfIteratee.bind(this, args));
    expect(args).to.eql(["a", 1, "b", 2]);
  });

  it('eachOf - instant resolver', function *() {
    var args = [];
    yield eachOf({ a: 1, b: 2 }, function* (x, k) { args.push(k, x);});
    // ensures done callback isn't called before all items iterated
    expect(args).to.eql(["a", 1, "b", 2]);
  });

  it('eachOf empty object', function *() {
    yield eachOf({}, function* (){ assert(false, 'iteratee should not be called'); });
    assert(true, 'should call callback');
  });

  it('eachOf empty array', function *() {
    yield eachOf([], function* () { assert(false, 'iteratee should not be called'); });
    assert(true, 'should call callback');
  });

  it('eachOf error', function *() {
    try {
      yield eachOf({ a: 1, b: 2 }, function(value, key) { throw 'error' });
      throw "Never here";
    } catch(err) {
      expect(err).to.equal('error');
    }
  });

  // per design eachOf no callback cannot be tested

  it('eachOf with array', function *() {
    var args = [];
    yield eachOf([ "a", "b" ], eachOfIteratee.bind(this, args));
    expect(args).to.eql([0, "a", 1, "b"]);
  });

  //for now, Set and Map iterators arent supported  (never used of them)

/*
  it('eachOf with Set (iterators)', function *() {
    if (typeof Set !== 'function')
      return;

    var args = [];
    var set = new Set();
    set.add("a");
    set.add("b");
    yield eachOf(set, eachOfIteratee.bind(this, args));
    expect(args).to.eql([0, "a", 1, "b"]);
  });


  it('eachOf with Map (iterators)', function *() {
    if (typeof Map !== 'function')
      return;

    var args = [];
    var map = new Map();
    map.set(1, "a");
    map.set(2, "b");
    yield eachOf(map, eachOfIteratee.bind(this, args));
    expect(args).to.eql([0, [1, "a"], 1, [2, "b"]]);
  });
*/

  it('eachOfSeries', function *() {
    var args = [];
    yield eachOfSeries({ a: 1, b: 2 }, eachOfIteratee.bind(this, args));
    expect(args).to.eql([ "a", 1, "b", 2 ]);
  });

  it('eachOfSeries empty object', function *() {

    yield eachOfSeries({}, function(){ assert(false, 'iteratee should not be called');});
    assert(true, 'should call callback');
  });

  it('eachOfSeries error', function *() {
    var call_order = [];
    try {
      yield eachOfSeries({ a: 1, b: 2 }, function(value, key){
        call_order.push(value, key);
        throw 'error';
      });
      throw "Not there";
    } catch(err) {
      expect(call_order).to.eql([ 1, "a" ]);
      expect(err).to.equal('error');
    }

  });

  // per design eachOfSeries no callback cannot be tested

  it('eachOfSeries with array', function *() {
    var args = [];
    yield eachOfSeries([ "a", "b" ], eachOfIteratee.bind(this, args));
    expect(args).to.eql([ 0, "a", 1, "b" ]);
  });

  it('eachOfLimit', function *() {
    var args = [];
    var obj = { a: 1, b: 2, c: 3, d: 4 };

    yield eachOfLimit(obj, 2, function* (value, key){
      yield sleep(value * 5);
      args.push(value, key);
    });

    expect(args).to.eql([ 1, "a", 2, "b", 3, "c", 4, "d" ]);
  });


});
