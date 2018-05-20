//
"use strict";

const Crypto = require('../lib/Crypto.js');

const $crypto = new Crypto();

const msg = 'Both shared secrets are BN instances';
const $psw = '32bytes-67VC61jmV54rIYu1545x4TlY';
const $iv = 'tondy';

const key = $crypto.genKeyPair();

console.log(key);

var key2 = $crypto.genKeyPair();
var shared1 = $crypto.secret(key.skey,key2.pkey);
var shared2 = $crypto.secret(key2.skey,key.pkey);

console.log('Shared secret:',shared1.toString(16) === shared2.toString(16));
console.log(shared1.toString(16));
console.log(shared2.toString(16));

var sign = $crypto.sign(key.skey, msg);
console.log('sign:',JSON.stringify(sign));
//const a = Array.from(new Uint8Array(sign));
//console.log(a);
console.log('verify:', $crypto.verify(key.pkey, msg, sign));

const a = [];
for (let i=0;i<10;i++) a.push(msg);
const s = a.join('\n');
console.log($crypto.decrypt($crypto.encrypt(s,$psw,$iv),$psw,$iv).toString());
