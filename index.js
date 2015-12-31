var P = require('bluebird');
var ObjectPromiseSolver = require('./lib/ObjectPromiseSolver.js');
var PromiseSolver = require('./lib/PromiseSolver.js');

function getPromiseSolver(promise){
  return promise && promise.p ? new ObjectPromiseSolver() : new PromiseSolver();
}

module.exports = function(promises) {
  return new P(function(resolve, reject) {
    var promiseSolver = getPromiseSolver(promises[0]);
    promiseSolver.all(promises).then(
      function(res) {
        var cleanResponse = promiseSolver.cleanRes(res);
        if (promiseSolver.hasErrors(res)) {
          return reject(cleanResponse);
        }
        return resolve(cleanResponse)
      }
    );
  });
};