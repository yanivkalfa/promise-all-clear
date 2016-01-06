var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);
var should = require('chai').should();
var all = require('./../index.js');
var P = require('bluebird');

/**
 * Testing:
 * array of promises resolve
 * array of promises rejection
 *
 * array of object resolve
 * array of object rejection
 */

function generatePromise(toResolve){
  return new P(function(resolve, reject){
    setTimeout(function(){
      if (toResolve) {
        return resolve('resolved');
      } else {
        return reject('rejected');
      }
    }, 1000);
  });
}

function generatePromises( object, toResolve){
  var promises = [], quantity = 10;
  for ( var i = 0; i < quantity; i++) {
    if (object) {
      if (i === 0) {
        promises.push({p: generatePromise(toResolve), id: i});
      } else {
        promises.push({p: generatePromise(true), id: i});
      }
    } else {
      if (i === 0) {
        promises.push(generatePromise(toResolve));
      } else {
        promises.push(generatePromise(true));
      }
    }
  }

  return promises;
}

describe('Testing `all` method ', function() {

  it('array of promises should resolve', function() {
    this.timeout(6000);
    var promises = generatePromises(false, true);
    return expect(all(promises)).to.be.fulfilled;
  });

  it('array of promises should reject', function() {
    this.timeout(6000);
    var promises = generatePromises(false, false);
    return expect(all(promises)).to.be.rejected;
  });

  it('array of objects should resolve and have `err` and `res` properties', function() {
    this.timeout(6000);
    var promises = generatePromises(true, true);
    return expect(all(promises)).to.be.fulfilled.and.to.eventually.satisfy( function(resp) {
      return (resp[0].hasOwnProperty('err') && resp[0].hasOwnProperty('res'));
    });
  });

  it('array of objects should reject and have `err` and `res` properties', function() {
    this.timeout(6000);
    var promises = generatePromises(true, false);
    return expect(all(promises)).to.be.rejected.and.to.eventually.satisfy( function(resp) {
      return (resp[0].hasOwnProperty('err') && resp[0].hasOwnProperty('res'));
    });
  });
});
