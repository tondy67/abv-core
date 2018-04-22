/**
 * Test agent.js
 */
"use strict";

const log = console.log.bind(console);
const assert = require('assert');
const { CAgent } = require('../index.js');
const WebSocket = require('ws');

const port = 8888;
const greeting = 'Hello server';

const wss = new WebSocket.Server({ port: port });

wss.on('connection', function (ws) {
	ws.on('message', function (msg) {
//    	const m = JSON.parse(msg);log(m);
    	ws.send(msg);
  	});

  	
});

describe('Abvos CAgent', function() {
	describe('create new CAgent', function() {
		it('returns CAgent', function() {
	    	const sock = new CAgent(); 
	    	assert(sock, 'No Socket?');
	  	});
		it('returns false if fake host', function() {
	    	const sock = new CAgent(); 
	    	const r = sock.connect('bla');
			assert.equal(r, false, 'return> false');
	  	});
	});

	describe('send message', function() {
		it('greeting', function(done) {
	    	const sock = new CAgent();
	    	sock.connect('http://127.0.0.1:' + port,WebSocket);
	    	sock.on('msg',(msg) => { 
	    		assert.equal(msg.b, greeting, 'msg: ' + greeting);
	    		done();
	    		setTimeout(() => { 
	    			sock.close();
	    			process.exit();
	    		}, 500);
	    	}); 
	    	sock.opened = () => {
					sock.send('msg', greeting, '');
				}
	  });
	});
});
