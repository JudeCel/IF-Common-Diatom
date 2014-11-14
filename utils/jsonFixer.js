var util = require('util');
var _ = require('lodash');

var defaultSpecials = {
	ID: 'id',
	APIKeyHash: 'apiKeyHash',
	APIEnabled: 'apiEnabled'
};

module.exports.toCamelCase = function (obj, specials) {
	return changeCase(camelCasify, obj, specials);
};
module.exports.toPascalCase = function (obj, specials) {
	return changeCase(pascalCasify, obj, specials);
};

function changeCase(caseFunction, obj, specials) {
	"use strict";
	specials = specials || defaultSpecials;

	// Don't mess with intrinsic types
	if (typeof obj !== 'object' || util.isDate(obj))
		return obj;
	if (obj === null)
		return null;

	if (util.isArray(obj))
		return _.map(obj, function (value) {
			return changeCase(caseFunction, value, specials);
		});

	var unscrewedObj = {};
	_.each(obj, function (value, key) {
		var unscrewedKey = caseFunction(key, specials);
		unscrewedObj[unscrewedKey] = changeCase(caseFunction, value, specials);
	});

	//.net also puts fully-qualified class names in for $type. Normally I wouldn't care, but I have to use
	// that to determine what type of message was sent. Simplify the type so routing doesn't suck.
	if (unscrewedObj.$type) {
		var a = unscrewedObj.$type.split(',')[0].split('.');
		unscrewedObj.$type = caseFunction(a[a.length - 1], specials); // use everything after the last dot
	}
	return unscrewedObj;
}

function camelCasify(str, specials) {
	if (specials[str])
		return specials[str];

	return str.replace(/^[A-Z]/,
		function ($1) {
			return $1.toLowerCase();
		}).replace('ID', 'Id');
}

function pascalCasify(str, specials) {
	if (specials[str])
		return specials[str];

	return str.replace(/^[a-z]/,
		function ($1) {
			return $1.toUpperCase();
		}).replace('Id', 'ID');
}
