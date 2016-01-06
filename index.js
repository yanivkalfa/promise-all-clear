var P = require('bluebird');
var ObjectPromiseSolver = require('./lib/ObjectPromiseSolver.js');
var PromiseSolver = require('./lib/PromiseSolver.js');

/**
 * Choses which type of resolver to instantiate.
 *
 * @param {Object} promise
 * @returns {Object} an instance of a resolver
 */
function getPromiseSolver(promise){
  return promise && promise.p ? new ObjectPromiseSolver() : new PromiseSolver();
}

/**
 * Main exporting function
 *
 * @param {Array} promises
 * @returns {Array}
 */
module.exports = function(promises) {
  return new P(function(resolve, reject) {
    var promiseSolver = getPromiseSolver(promises[0]);
    promiseSolver.all(promises).then(
      function(res) {
        var cleanResponse = promiseSolver.clearResponse(res);
        if (promiseSolver.hasErrors(res)) {
          return reject(cleanResponse);
        }
        return resolve(cleanResponse)
      }
    );
  });
};