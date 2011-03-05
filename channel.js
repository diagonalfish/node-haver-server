/*
	node-haver-server
	Haver chat server for Node.js

	Copyright (c) 2011 Eric Goodwin

	For license information, see LICENSE
*/

function Channel(name) {
	this.name = name;
	this.users = [];
	
	this.addUser = function(user) {
		this.users.push(user);
	}
	
	this.removeUser = function(user) {
		for (var i = 0; i < users.length; i++) {
			if (user == users[i])
				users.splice(i, 1);
		}
	}
	
	/**
	 * Send a message to all users in the channel.  If 'origin' is not null, exclude that
	 * user from the broadcast.
	*/
	this.broadcast = function(origin, message) {
		this.users.forEach(function(user) {
			if (user != origin)
				user.sendMessage(message);
		});
	}
	
}

exports.createChannel = function (name) {
	return new Channel(name);
}