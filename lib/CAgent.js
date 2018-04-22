/**
 * Abvos client side agent
 * 
 */
"use strict";

const ts = require('abv-ts')('abv:CAgent');
const socket = require('abv-socket');

class CAgent extends socket.CSocket
{
	constructor(host,ws)
	{
		super(host,ws);

		this.online = new Map();
		const me = this;
		this.on('write',(msg) => {
			const b = msg.b;
			delete(msg.b);
			me._read(msg, b);
		});

		this.on('echo',(msg) => {
			var r = Date.now() + '';
			return r;
		});
		
		this.on('msg',(msg) => {
			return me.out(msg);
		});
		
		this.on('id',(msg) => {
			me.id = msg.t;
			me.name = msg.t;
		});

		this.on('online',(msg) => {
			let m = null;
			try{ m = new Map(JSON.parse(msg.b)); }catch(e){}
			if (m){
				this.online = m;
				const s = Array.from(m.keys()).join(',');
				me.out('online: ' + s);
			}
		});

		this.on('file',(msg) => {
			me.file(msg);
		});

		this.on('error',(err) => { ts.error(57, err); });
	}
	// TODO: Client side CAgent
	
}

module.exports = CAgent;
