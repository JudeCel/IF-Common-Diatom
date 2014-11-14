"use strict";

module.exports.encode = function (input) {
	if(input instanceof Buffer)
		input = input.toString('base64');

	return input.replace(/\+/g, '-').replace(/=/g, '').replace(/\//g, '_');
};

module.exports.decodeToBuffer = function(input) {
	input = input.replace(/-/g, '+').replace(/_/g, '/');

	var amtCharsToPad = input.length + (4 - input.length % 4) % 4;
	input += new Array(amtCharsToPad).join('=');

	return new Buffer(input, 'base64');
};

module.exports.decodeToString = function(input) {
	var buf = exports.decodeToBuffer(input);
	return buf.toString('base64');
};
