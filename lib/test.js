//
"use strict";

const Crypto = require('./Crypto.js');

const $crypto = new Crypto();

const msg = 'Both shared secrets are BN instances';

const key = $crypto.genKeyPair();

console.log(key);

var key2 = $crypto.genKeyPair();
var shared1 = $crypto.secret(key.skey,key2.pkey);
var shared2 = $crypto.secret(key2.skey,key.pkey);

console.log('Both shared secrets are BN instances');
console.log(shared1.toString(16));
console.log(shared2.toString(16));

var sign = $crypto.sign(key.skey, msg);
//console.log(sign);
//const a = Array.from(new Uint8Array(sign));
//console.log(a);
console.log($crypto.verify(key.pkey, msg,sign));
