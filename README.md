Promise all clear
===============



Resolves or rejects an array of promises only when the entire collection of promises was done executing.

Exposes the `all` method that returns a promise and will iterate over the entire collection regardless of rejection or success.
the promise will reject if one or more of the promises was rejected

The `all` method will take an array of promises or array of objects containing the property `p` (for promise)
and return an array of objects with feedback on which promise failed or succeeded or an array with the promise reject or resolve value.

Note: array of objects containing `p` property will be mutated with the feedback on failure or success.


<strong>Installation </strong>
```bash
$ npm install promise-all-clear
```


<strong>Usage </strong>
```javascript
var all = require('promise-all-clear');

// Can either be a simple array of promises.
var promises = [ aPromise, aPromise2, aPromise3 ];

// Or array of objects with the 'p' property and other properties you want to keep track of.
var promises = [
    {p: aPromise, id:'sjsjsha', msg: 'another property'},
    {p: aPromise2, id:'j3h37', msg: 'another property2'},
    {p: aPromise3, id:'a212a3', msg: 'another property3'},
]

all(promises).then(
    function(resp){
        // resolved
    },
    function(resp){
        // rejected
    }
)

all(promises).then(function(resp){
    // resolved
}).catch(function(resp){
    //rejected
});
```


<strong>Response </strong>

In case of array of objects with the `p` property, response will be an array of mutated object where the `res`, `err`
property are added to those objects.

In case of array of promises, response will be an array with the promise reject or resolve value.
