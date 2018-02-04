/**
 * Abvos client side agent
 * 
 */
"use strict";

const ts = require('abv-ts')('abv:core.Agent');
const socket = require('abv-socket');

class Agent extends socket.CSocket
{
	constructor(host,ws)
	{
		super(host,ws);
		const me = this;
	}
	// TODO: Client side Agent
	
}

module.exports = Agent;
