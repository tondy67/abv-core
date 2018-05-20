/**
 * 
 */
"use strict";

const crypto = require('crypto');
const $aes = 'aes-256-gcm';

const EC = require('elliptic').ec;
 
class Crypto
{

	constructor(curve='secp256k1',aad='abvos') 
	{
		this.ec = new EC(curve);
		this.aad = Buffer.from(aad);
	}
	
	genKeyPair()
	{
		const k = this.ec.genKeyPair();
		const pkey = k.getPublic('hex');
		const skey = k.getPrivate('hex');
		return {pkey: pkey, skey: skey};
	}
	
	sign(skey, msg)
	{
		const key = this.keyFromPrivate(skey);
		const signature = key.sign(msg);
		const der = signature.toDER();
		const hex = Buffer.from(der).toString('hex');
		return hex;
	}
	
	verify(pkey, msg, sign)
	{
		const s = [...Buffer.from(sign, 'hex')];
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
		return this.ec.keyFromPublic(pkey,'hex');
	}
	
	keyFromPrivate(skey)
	{
		return this.ec.keyFromPrivate(skey,'hex');
	}
	
	encrypt(body, psw, iv)
	{
		const buf = Buffer.from(body);
		const cipher = crypto.createCipheriv($aes, psw, iv);
		cipher.setAAD(this.aad);
		const enc = Buffer.concat([cipher.update(buf),cipher.final()]);
		const tag = cipher.getAuthTag();
		return { enc: enc.toString('hex'), tag: tag.toString('hex') };
	}
	
	decrypt(enc, psw, iv)
	{
		let r = null;
		if (!enc) return r;
		try{
			const c = Buffer.from(enc.enc, 'hex');
			const decipher = crypto.createDecipheriv($aes, psw, iv);
			decipher.setAAD(this.aad);
			decipher.setAuthTag(Buffer.from(enc.tag, 'hex'));
			r = Buffer.concat([decipher.update(c) , decipher.final()]);
		}catch(e){ console.log(83,e); }
		return r;
	}

	
}

module.exports = Crypto;
