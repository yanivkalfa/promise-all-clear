var P = require('bluebird');

function PromiseSolver(){}
PromiseSolver.prototype.all = function(promises){
  return P.all(promises.map(function(promise) {
      return promise.then( function (res) { return  { res: res, err: false } }, function (res) { return { res: res, err: true } } )
    })
  );
};

PromiseSolver.prototype.hasErrors = function(res) {
  for (var i=0; i < res.length; i++) {
    if (res[i].err) return true;
  }
  return false;
};

PromiseSolver.prototype.cleanResponse = function(res) {
  return res.map(function(response){
    return response.res;
  })
};

module.exports.PromiseSolver = PromiseSolver;