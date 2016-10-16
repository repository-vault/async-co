"use strict";

const assert = require('assert');
const expect = require('expect.js');
const sleep  = require('nyks/function/sleep');

const queue  = require('../queue');
describe('queue', function(){

  it('basics', function *() {

    var call_order = [];
    var delays = [40,20,60,20];


    // worker1: --1-4
    // worker2: -2---3
    // order of completion: 2,1,4,3

    var q = queue(function * (task) {
      yield sleep(delays.shift());
      call_order.push('process ' + task);
      return Promise.resolve('arg');
    }, 2);



    yield [ function *(){ 
      var arg = yield q.push(1);
      expect(arg).to.equal('arg');
      call_order.push('callback ' + 1);

    }, function *(){

      var arg = yield q.push(2);
      expect(arg).to.equal('arg');
      call_order.push('callback ' + 2);

    }, function *(){

      var arg = yield q.push(3);
      expect(arg).to.equal('arg');
      call_order.push('callback ' + 3);

    }, function *(){
      var arg = yield q.push(4)
      expect(arg).to.equal('arg');
      call_order.push('callback ' + 4);
    }];


    expect(call_order).to.eql([
      'process 2', 'callback 2',
      'process 1', 'callback 1',
      'process 4', 'callback 4',
      'process 3', 'callback 3'
    ]);

  });


  it('default concurrency', function *() {


    var call_order = [];
    var delays = [40,20,60,20];


    // worker1: --1-4
    // worker2: -2---3
    // order of completion: 2,1,4,3

    var q = queue(function * (task) {
      yield sleep(delays.shift());
      call_order.push('process ' + task);
      return Promise.resolve('arg');
    }, 1);



    yield [ function *(){ 
      var arg = yield q.push(1);
      expect(arg).to.equal('arg');
      call_order.push('callback ' + 1);

    }, function *(){

      var arg = yield q.push(2);
      expect(arg).to.equal('arg');
      call_order.push('callback ' + 2);

    }, function *(){

      var arg = yield q.push(3);
      expect(arg).to.equal('arg');
      call_order.push('callback ' + 3);

    }, function *(){
      var arg = yield q.push(4)
      expect(arg).to.equal('arg');
      call_order.push('callback ' + 4);
    }];


    expect(call_order).to.eql([
      'process 1', 'callback 1',
      'process 2', 'callback 2',
      'process 3', 'callback 3',
      'process 4', 'callback 4',
    ]);
  });


  it('error propagation', function* () {
    var results = [];

    var q = queue(function *(task) {
      if(task.name === 'foo')
        throw 'fooError';
    }, 2);

    yield  [ function * () {
      yield q.push({name: 'bar'});
      results.push('bar');
    }, function * () {
      yield q.push({name: 'bur'});
      results.push('bur');
    }, function * () {
      try {
        yield q.push({name: 'foo'});
      } catch(err){
        results.push(err);
        return ;
      }
      results.push('foo');
    }];

    expect(results).to.eql(['bar', 'bur', 'fooError']);
  });



});

