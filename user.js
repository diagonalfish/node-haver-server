/*
	node-haver-server
	Haver chat server for Node.js

	Copyright (c) 2011 Eric Goodwin

	For license information, see LICENSE
*/

function User(stream) {
	this.username = null;
	this.stream = stream;
	this.logged_in = false;
	this.alive = true;
	this.channels = [];
	
	/* Functions */
	
	this.sendMessage = function(jsonMessage) {
		if (this.stream.writable && this.alive)
			this.stream.write(JSON.stringify(jsonMessage) + "\n");
	};
	
	this.joinChannel = function(channel) {
		this.channels.push(channel);
	}
	
	this.leaveChannel = function(channel) {
		for (var i = 0; i < this.channels.length; i++) {
			if (channel == this.channels[i])
				this.channels.splice(i, 1);
		}
	}
	
	this.bork = function(reason) {
		this.sendMessage(['bork', reason]);
		this.stream.end();
	};
	
	this.die() {
		this.alive = false;
		this.channels.forEach(function(channel) {
			channel.removeUser(this);
		}
	}

}

exports.createUser = function (stream) {
	return new User(stream);
}