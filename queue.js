"use strict";

  //st exupery style

module.exports = function(thunk, workers){
  var workerChain = [];

  var push = function * (task) {
    var delayed = yield process(task);
    return delayed;
  }

  var process = function *(task) {
    yield pickworker();
      var ret = yield thunk.apply(this, task);
    freeworker();
    return Promise.resolve(ret);
  }

  var pickworker = function () {
    if(!workers) //no available worker, waiting
      return new Promise(function(resolve, reject){
        workerChain.push(resolve)
      });
    return Promise.resolve(workers--); //worker id
  }

  var freeworker = function() {
    workers++;
    if(workerChain.length)
      workerChain.shift()(pickworker());
  }

  return { push };
}
