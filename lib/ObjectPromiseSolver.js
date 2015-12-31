var PromiseSolver = require('./PromiseSolver.js');
var P = require('bluebird');

function ObjectPromiseSolver(){}
ObjectPromiseSolver.prototype = Object.create(PromiseSolver.prototype);
ObjectPromiseSolver.prototype.constructor = ObjectPromiseSolver;

ObjectPromiseSolver.prototype.all = function(promises){
  return P.all(
    promises.map(
      function(promise) {
        return promise.p.then(
          function (res) {
            promise.err = false;
            promise.res = res;
            return  promise;
          },
          function (res) {
            promise.err = true;
            promise.res = res;
            return  promise;
          }
        )
      }
    )
  );
};

ObjectPromiseSolver.prototype.clearResponse = function(res) { return res;};

module.exports = (function(){ return ObjectPromiseSolver; })();