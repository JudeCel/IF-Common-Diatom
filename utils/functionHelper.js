var _ = require('lodash');

module.exports.unary = unary;
module.exports.filter = filter;
module.exports.guard = guard;
module.exports.guardWithDefault = guardWithDefault;
module.exports.wrapWithCb = wrapWithCb;
module.exports.profileWithCb = profileWithCb;
module.exports.get = get;

function wrapWithCb(fn) {
	var newArgs = _.rest(arguments, 1);
	return function(cb) {
		newArgs.push(cb);
		fn.apply(null, newArgs);
	};
}

/*call this with profileWithCb(fn, arg1, argN, cb)*/
function profileWithCb() {
	var args = Array.prototype.slice.call(arguments);
	var fn = args.shift();

	var cb = args[args.length - 1];
	args[args.length - 1] = function () {
		console.timeEnd(fn.name);
		cb.apply(null, Array.prototype.slice.call(arguments));
	};

	console.time(fn.name);
	fn.apply(null, args);
}

function unary (fn) {
	if (fn.length == 1) return fn;
	return function (args) {
		return fn.call(this, args);
	}
}

function filter(fn) {
	return function filtered(array) {
		return _.filter(array, fn)
	};
}

function guard(fn) {
	return function () {
		var i;
		if (arguments.length === 0)
			return;

		for (i = 0; i < arguments.length; ++i)
			if (arguments[i] == null) return;

		return fn.apply(this, arguments);
	}
}

function guardWithDefault(fn, defaultValue) {
	return function () {
		var i;
		if (arguments.length === 0)
			return fn.apply(this, defaultValue);

		for (i = 0; i < arguments.length; ++i)
			if (arguments[i] == null) return fn.apply(this, defaultValue);

		return fn.apply(this, arguments);
	}
}

function get (attr) {
	return function (object) { return object[attr]; }
}
