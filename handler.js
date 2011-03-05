/*
	node-haver-server
	Haver chat server for Node.js

	Copyright (c) 2011 Eric Goodwin

	For license information, see LICENSE
*/

function Handler(channels) {

	this.channels = channels;
	
	this.handleMessage = function(user, rawmessage) {
		//Attempt to parse json
		var message;
		try {
			message = JSON.parse(rawmessage)
		} catch (e) {
			//Invalid JSON
			user.bork("Invalid JSON");
			return;
		}
	}

}

exports.createHandler = function (channels) {
	return new Handler(channels);
}