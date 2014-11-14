"use strict";
var _ = require('lodash');
var fn = require('./functionHelper.js');

module.exports.splat = splat;
module.exports.strArrayToIntArray = exports.splat(fn.unary(parseInt));
module.exports.strArrayToFloatArray = exports.splat(parseFloat);
module.exports.arrayPick = arrayPick;
module.exports.arrayOmit = arrayOmit;
module.exports.split = split;
module.exports.arrayToHash = arrayToHash;
module.exports.primitiveArrayToHash = primitiveArrayToHash;

function split(array, chunkSize) {
	var ret = [];
	var amtGroups = Math.ceil(array.length / chunkSize);

	for (var i = 0, j = 0; i < amtGroups; i++, j += chunkSize) {
		ret.push(array.slice(j, j + chunkSize));
	}

	return ret;
}

function arrayPick(arr, props) {
	var props = _.rest(arguments, 1);
	return _.map(arr, function (i) {
		return _.pick.apply(null, [i].concat(props));
	});
}

function arrayOmit(arr, props) {
	var props = _.rest(arguments, 1);
	return _.map(arr, function (i) {
		return _.omit.apply(null, [i].concat(props));
	});
}

function splat(fn) {
	return function (list) {
		return Array.prototype.map.call(list || [], fn);
	};
}

function arrayToHash(key) {
	return function (arr) {
		var o = _.groupBy(arr, key);
		// groupBy creates an object of key -> [value], but we want key -> value
		_.each(o, function(value, newKey) {
			return o[newKey] = value.shift();
		});
		return o;
	};
}

function primitiveArrayToHash(arr) {
	var o = {};
	_.each(arr, function(value) {
		o[value] = value;
	});
	return o;
}
