"use strict";
var os = require('os');
var _ = require('lodash');

var hostName = os.hostname();
var appName = process.cwd().split('/').pop();

function scrubParams(params) {
	if (!params) return params;
	var scrubbedParams = _.clone(params);
	var keysToScrub = ['password'];

	_.each(keysToScrub, function (key) {
		if (scrubbedParams[key])
			scrubbedParams[key] = '###SCRUBBED###';
	});
	return scrubbedParams;
}

function messageFromExpressJSReq(params) {
	if (!params || !params.req || !params.overrides)
		throw new Error("Error: nothing passed to log.");

	var req = params.req;
	var res = params.res || {};
	var overrides = params.overrides;
	var locals = req.locals || res.locals || {};
	var headers = req.headers || {};

	var scrubbedParams = scrubParams(req.params);
	var scrubbedBody = scrubParams(req.body);

	return _.defaults({}, locals, overrides, {
		$type: 'itemLogged',
		accountId: 1,
		userId: 1,
		priority: 'INFO',
		logger: appName,
		uRL: req.url,
		exception: '',
		message: '',
		application: appName + '@' + hostName,
		machine: hostName,
		clientIP: req.ip,
		client: headers['user-agent'],
		serverVariables: "query: " + JSON.stringify(req.query || {}) +
			"\nparams: " + JSON.stringify(scrubbedParams || {}) +
			"\ncookies: " + JSON.stringify(req.cookies || {}) +
			"\nheaders: " + JSON.stringify(headers) +
			"\nbody: " + JSON.stringify(scrubbedBody || {}),
		sessId: locals.sessionId || locals.sessId
	});
}

function createMessage(params) {
	if (!params)
		throw new Error("Error: nothing passed to log.");

	return _.defaults(params, {
		$type: 'itemLogged',
		accountId: 1,
		userId: 1,
		priority: 'INFO',
		logger: appName,
		application: appName + '@' + hostName,
		machine: hostName
	});
}

module.exports = {
	messageFromExpressJSReq: messageFromExpressJSReq,
	scrubParams: scrubParams,
	createMessage: createMessage
};

