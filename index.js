/**
 * Abvos core
 * @module abv-core
 */
"use strict";

const ts = require('abv-ts')('abv:core');

const Agent = require('./lib/agent.js');

const core = {
	Agent: 		Agent
}

module.exports = {
	core: core
};