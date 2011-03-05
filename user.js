/*
	node-haver-server
	Haver chat server for Node.js

	Copyright (c) 2011 Eric Goodwin

	For license information, see LICENSE
*/

function User(stream) {
	var CLIENT_DISCONNECTED = 0;
	var CLIENT_CONNECTED = 1;
	var CLIENT_LOGGED_IN = 2;

	this.username = null;
	this.stream = stream;
	this.status = CLIENT_CONNECTED;
	
	/* Functions */
	
	this.sendMessage = function(type, argument) {
		var jsonMessage = [type, argument];
		this.stream.write(JSON.stringify(jsonMessage) + "\n");
	};
	
	this.bork = function(reason) {
		this.sendMessage('bork', reason);
		this.stream.end();
	};
	
	this.handleMessage = function(message) {
		this.stream.write(message);
	}
}

exports.createUser = function (stream) {
	return new User(stream);
}