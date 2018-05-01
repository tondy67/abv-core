/**
 * 
 */
"use strict";

const crypto = require('crypto');
const $aes = 'aes-256-gcm';

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
 
const $psw = '32bytes-67VC61jmV54rIYu1545x4TlY';
const $iv =  'iVector';

class Crypto
{

	constructor() 
	{
	}
	
	genKeyPair()
	{
		const k = ec.genKeyPair();
		const pkey = k.getPublic('hex');
		const skey = k.getPrivate('hex');
		return {pkey: pkey, skey: skey};
	}
	
	sign(skey, msg)
	{
		const key = this.keyFromPrivate(skey);
		const signature = key.sign(msg);
		const der = signature.toDER();
		const ab = new Uint8Array(der).buffer;
		return ab;
	}
	
	verify(pkey, msg, sign)
	{
		const s = Array.from(new Uint8Array(sign));
		const key = this.keyFromPublic(pkey);
		return key.verify(msg, s);
	}
	
	secret(skey1, pkey2)
	{
		const key1 = this.keyFromPrivate(skey1);
		const key2 = this.keyFromPublic(pkey2);
		const shared = key1.derive(key2.getPublic());
		return shared;
	}
	
	keyFromPublic(pkey)
	{
		return ec.keyFromPublic(pkey,'hex');
	}
	
	keyFromPrivate(skey)
	{
		return ec.keyFromPrivate(skey,'hex');
	}
	
	encrypt(body, psw, iv)
	{
		if (!psw) psw = $psw;
		if (!iv)  iv  = $iv;
		const buf = Buffer.from(body);
		const cipher = crypto.createCipheriv($aes, psw, iv);
		const encrypted = Buffer.concat([cipher.update(buf),cipher.final()]);
		const tag = cipher.getAuthTag();
		return { enc: encrypted, tag: tag };
	}
	
	decrypt(enc, psw, iv)
	{
		if (!enc) return null;
		if (!psw) psw = $psw;
		if (!iv)  iv  = $iv;
		enc.enc = Buffer.from(enc.enc);
		enc.tag = Buffer.from(enc.tag);
		const decipher = crypto.createDecipheriv($aes, psw, iv)
		decipher.setAuthTag(enc.tag);
		const dec = Buffer.concat([decipher.update(enc.enc) , decipher.final()]);
		return dec;
	}

	
}

module.exports = Crypto;
