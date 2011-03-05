/*
	node-haver-server
	Haver chat server for Node.js

	Copyright (c) 2011 Eric Goodwin

	For license information, see LICENSE
*/

//Constants
var VERSION = 0.1;

//Libs
var net = require('net');
var Log = require('log');

var User = require('./user');

//Global objects
var channels = [];

//Logger
log = new Log(Log.DEBUG);

/* Startup */
log.info("node-haver-server v" + VERSION + " by Eric Goodwin");

var haver_server = net.createServer(function(stream) {
	log.info("New client from " + stream.remoteAddress);
	var newuser = User.createUser(stream);
	stream.user = newuser;
	
	/* Set up listeners */
	stream.addListener("data", function(data) {
		stream.user.handleMessage(data);
	});
	
	stream.addListener("end", function() {
		log.info("Client from " + stream.remoteAddress + " disconnected.");
	});
	
});

haver_server.listen(7575);
log.info("Listening on port 7575...");

/* Channel */

function Channel(name) {
	this.name = name;
}