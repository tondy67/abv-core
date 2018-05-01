/**
 * Abvos core
 * @module abv-core
 * https://github.com/tondy67/abv-core
 */
"use strict";

const Crypto = require('./lib/Crypto.js');
const Pack = require('abv-pack');
const Wallet = require('abv-wallet');
const { XmlParser } = require("abv-parser");
const JSZip = require("jszip");

module.exports = {
	Crypto: Crypto,
	Wallet: Wallet,
	Pack: Pack,
	XmlParser: XmlParser,
	Zip: JSZip	
};
