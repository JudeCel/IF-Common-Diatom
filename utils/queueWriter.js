"use strict";
var pubSub = require('amqputil');
var _queue, _config;

module.exports.connect = function (config, cb) {
	_config = config;
	pubSub.connect(_config.queueUri, _config.queueName, function connectCb(pub) {
		_queue = pub;
		if(cb) cb();
	});
};

module.exports.writeMessage = function (msg, cb) {
	_queue.publish(msg);
	if(cb) cb();
};

module.exports.disconnect = function (cb) {
	if (_queue) pubSub.close(_config.queueUri);
	_config = null;
	if(cb) cb();
};
