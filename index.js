
var P = require('bluebird');

function PromiseSolver(){}
PromiseSolver.prototype.all = function(promises){
  return P.all(promises.map(function(promise) {
      return promise.then( function (res) { return  res; }, function (err) { return err } )
    })
  );
};

PromiseSolver.prototype.hasErrors = function(res) {
  for (var i=0; i < res.length; i++) {
    if (res instanceof Error) return true;
  }
  return false;
};


function ObjectPromiseSolver(){}

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
          function (err) {
            promise.err = err;
            promise.res = false;
            return  promise;
          }
        )
      }
    )
  );
};

ObjectPromiseSolver.prototype.hasErrors = function(res) {
  for (var i=0; i < res.length; i++) {
    if (res.err) return true;
  }
  return false;
};

function getPromiseSolver(promise){
  return promise && promise.p ? new ObjectPromiseSolver() : new PromiseSolver();
}

module.exports = {
  promiseAll: function(promises) {
    return new P(function(resolve, reject) {
      var promiseSolver = getPromiseSolver(promises[0]);
      promiseSolver.all(promises).then(
        function(res) {
          if (promiseSolver.hasErrors(res)) {
            return reject(res);
          }
          return resolve(res)
        },
        function(err){
          return reject(err)
        }
      );
    });
  }
};