"use strict";


const assert     = require('assert');
const expect     = require('expect.js');
const each       = require('../each');
const eachSeries = require('../eachSeries');
const eachLimit  = require('../eachLimit');

const sleep  = require('nyks/function/sleep');






describe("each", function() {

  function * eachIteratee(args, x) {
    yield sleep(x * 25);
    args.push(x);
    return x;
  }

  function eachNoCallbackIteratee(done, x, callback) {
    expect(x).to.equal(1);
    callback();
    done();
  }

  it('each', function* () {
    var args = [];
    yield each([1,3,2], eachIteratee.bind(this, args));
    expect(args).to.eql([1,2,3]);
  });

  it('each with object', function* () {
    var args = [];
    var result = yield each({"firstKey" : 2, "secondtKey" : 1}, function*(x){
      yield sleep(x * 25)
      return x * 2;
    })
    expect(result).to.eql({"firstKey" : 4, "secondtKey" : 2});
  });


    //per design, each extra callback cannot be tested
    //per design, each no callback cannot be tested
  it('each empty array', function* () {
    yield each([], function(x){
      throw 'iteratee should not be called'
    })
    expect(true).to.be.ok();
  });

  it('each error', function* () {
    try {
      yield each([1,2,3], function* (x){ throw 'error'; });
      throw "Never here";
    } catch(err) {
      expect(err).to.equal('error');
    }
  });

  it('each empty array, with other property on the array', function* () {
    var myArray = [];
    myArray.myProp = "anything";
    yield each(myArray, function* (x){ throw 'error'; });
    assert(true, 'should call callback');
  });



  it('eachSeries', function* () {
    var args = [];
    yield eachSeries([1,3,2], eachIteratee.bind(this, args));
    expect(args).to.eql([1,3,2]);
  });

  it('eachSeries empty array', function* () {
    yield eachSeries([], function* (x){ assert(false, 'iteratee should not be called') });
    assert(true, 'should call callback');
  });


    //per design, eachSeries array modification cannot be tested
    //per design, eachSeries single item cannot be reproduced
    //per design, eachSeries no callback cannot be tested


  it('eachSeries error', function* () {
    var call_order = [];
    try {
      yield eachSeries([1,2,3], function* (x){
        call_order.push(x);
        throw "error";
      });
      throw "Never here";
    } catch(err) {
      expect(call_order).to.eql([1]);
      expect(err).to.equal('error');
    }
  });


  it('eachLimit', function* () {
    var args = [];
    var arr = [0,1,2,3,4,5,6,7,8,9];
    yield eachLimit(arr, 2, function* (x) {
      yield sleep(x*5);
      args.push(x);
    });

    expect(args).to.eql(arr);
  });


  it('eachLimit empty array', function* () {
    yield eachLimit([], 2, function* (x) {
      assert(false, 'iteratee should not be called');
    });
    assert(true, 'should call callback');
  });


  it('eachLimit limit exceeds size', function* () {
    var args = [];
    var arr = [0,1,2,3,4,5,6,7,8,9];
    yield eachLimit(arr, 20, eachIteratee.bind(this, args));
    expect(args).to.eql(arr);
  });

  it('eachLimit limit equal size', function* () {
    var args = [];
    var arr = [0,1,2,3,4,5,6,7,8,9];
    yield eachLimit(arr, 10, eachIteratee.bind(this, args));
    expect(args).to.eql(arr);
  });


  //per sanity eachLimit zero limit will never be supported
  //per design eachLimit no callback cannot be tested

  it('eachLimit error', function* () {
    var arr = [0,1,2,3,4,5,6,7,8,9];
    var call_order = [];

    try {
      yield eachLimit(arr, 3, function* (x) {
        call_order.push(x);
        if (x === 2)
          throw 'error';
      });
      throw "never here";
    } catch( err) {
      expect(call_order).to.eql([0,1,2]);
      expect(err).to.equal('error');
    }
  });



  it('eachLimit synchronous', function* () {
    var args = [];
    var arr = [0,1,2];
    yield eachLimit(arr, 5, function *(x ){ args.push(x); });
    expect(args).to.eql(arr);
  })



  it('eachLimit does not continue replenishing after error', function* () {
    var started = 0;
    var arr = [0,1,2,3,4,5,6,7,8,9];
    var delay = 10;
    var limit = 3;
    var maxTime = 10 * arr.length;

    yield [ function*(){
      try {
        yield eachLimit(arr, limit, function* (x) {
          started ++;
          if (started === 3)
            throw "Test Error";
          yield sleep(delay);
        });
        throw "Not there";  
      } catch(err){
        expect(err).to.eql("Test Error");
    }}, function *() {
        yield sleep(maxTime);
        expect(started).to.equal(3);
    } ];

  });



});
