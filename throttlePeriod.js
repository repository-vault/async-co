"use strict";



var throttle = function(gn , period) {
  var runnig =  false;
  var mustRerunnif = false;


 return function * loop () {
    if(runnig) {
      mustRerunnif = arguments;
      return;
    }

    try {
      runnig = true;
      yield gn.apply(null, arguments);
    } finally {

      if(period)
        yield new Promise(function(resolve){ setTimeout(resolve, period);});

      runnig = false;
      if(!mustRerunnif)
        return;

      var args = mustRerunnif;
      mustRerunnif = false;
      yield loop.apply(null, args);
    }
  }
}

module.exports = throttle;