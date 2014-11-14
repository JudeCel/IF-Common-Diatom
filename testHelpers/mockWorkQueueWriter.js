module.exports.sentMessages = [];
module.exports.writeMessage = function (msg, cb) {
	exports.sentMessages.push(msg);
	if (cb) cb();
};
module.exports.reset = function (cb) {
	exports.sentMessages = [];
	if (cb) cb();
};
