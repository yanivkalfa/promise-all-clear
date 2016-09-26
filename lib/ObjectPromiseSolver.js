var PromiseSolver = require('./PromiseSolver.js');
var P = require('bluebird');

/**
 * Object promise resolver
 *
 * @extends PromiseSolver
 * @constructor
 */
function ObjectPromiseSolver() {}
ObjectPromiseSolver.prototype = Object.create(PromiseSolver.prototype);
ObjectPromiseSolver.prototype.constructor = ObjectPromiseSolver;

/**
 * Takes an array of objects and resolve or reject them all.
 *
 * @param {array} promises
 * @returns {Array}
 */
ObjectPromiseSolver.prototype.all = function(promises) {
  return P.all(
    promises.map(
      function(promise) {
        var error, success;
        error = function (res) {
          promise.err = true;
          promise.res = res;
          return  promise;
        };
        success = function (res) {
          promise.err = false;
          promise.res = res;
          return  promise;
        };

        if (!promise.p || !promise.p.then) return error(new Error('The object missing p property that holds the promise.'));
        return promise.p.then(success,error)
      }
    )
  );
};

/**
 * Overrides parent and simply return the Array
 *
 * @param {Array} res
 * @returns {Array}
 */
ObjectPromiseSolver.prototype.clearResponse = function(res) { return res;};

module.exports = (function(){ return ObjectPromiseSolver; })();
