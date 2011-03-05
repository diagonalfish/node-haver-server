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
var lines = require('lines');

var User = require('./user');
var Channel = require('./channel');
var Handler = require('./handler');

//Global objects
var channels = new Array();

//Logger
log = new Log(Log.DEBUG);

/* Startup */
log.info("node-haver-server v" + VERSION + " by Eric Goodwin");

var handler = Handler.createHandler(channels);

var haver_server = net.createServer(function(stream) {
	log.info("New client from " + stream.remoteAddress);
	
	var newuser = User.createUser(stream);
	stream.user = newuser;
	stream.setEncoding('utf8');
	lines(stream);
	
	/* Set up listeners */
	stream.on("line", function(data) {
		handler.handleMessage(stream.user, data);
	});
	
	stream.on("end", function() {
		log.info("Client from " + stream.remoteAddress + " disconnected.");
		//TODO: if unexpected quit, trigger QUIT message?
		stream.user.die();
	});
	
});

haver_server.listen(7575);
log.info("Listening on port 7575...");