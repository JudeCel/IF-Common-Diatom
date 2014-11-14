"use strict";
var deferredCommands = [];

module.exports = function (config, defaultCommand) {
	var deferredCommands = [];

	return {
		defer: false,
		runDeferred: function (runDeferredCb) {
			if (!runDeferredCb)
				runDeferredCb = function runDeferredDefaultCb() {};
			if (deferredCommands.length === 0)
				return runDeferredCb();
			deferredCommands.pop()(runDeferredCb);	//Just one-at-a-time for now
		},
		commandMap: {
			restart: function (msg, cb) {
				defaultCommand;
			}
		}
	};
};
