var P = require('bluebird');

/**
 * Simple promise resolver
 *
 * @constructor
 */
function PromiseSolver() {}

/**
 * Takes an array of promises and resolve or reject them all.
 *
 * @param {array} promises
 * @returns {Array}
 */
PromiseSolver.prototype.all = function(promises) {
  return P.all(promises.map(function(promise) {
      return promise.then( function (res) { return  { res: res, err: false } }, function (res) { return { res: res, err: true } } )
    })
  );
};

/**
 * Takes array of responses and check if any of the is an error.
 *
 * @param {Array} res
 * @returns {boolean}
 */
PromiseSolver.prototype.hasErrors = function(res) {
  for (var i=0; i < res.length; i++) {
    if (res[i].err) return true;
  }
  return false;
};

/**
 * Will map the array of object with res and err property and change it to array of values taken from res property.
 *
 * @param {Array} res
 * @returns {Array}
 */
PromiseSolver.prototype.clearResponse = function(res) {
  return res.map(function(response){
    return response.res;
  })
};

module.exports = (function(){ return PromiseSolver; }) ();
