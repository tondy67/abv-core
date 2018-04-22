/**
 * Abvos core
 * @module abv-core
 * https://github.com/tondy67/abv-core
 */
"use strict";

const ts = require('abv-ts')('abv:core');

const CAgent = require('./lib/CAgent.js');

module.exports = {
	CAgent: 		CAgent
};
