"use strict";
var _ = require('lodash');
var functionHelper = require('./functionHelper.js');

// pulled directly from node validator
module.exports.isInt = isInt;

function isInt(value) {
	var floatVal = parseFloat(value);
	var intVal = parseInt(value * 1, 10);

	return !isNaN(intVal) && floatVal == intVal;
}

module.exports.isIntArray = function(arr) {
	if(!_.isArray(arr) || _.isEmpty(arr)) return false;

	return functionHelper.filter(function(i) {
		return isInt(i);
	})(arr).length;
};

module.exports.isIntOrEmptyArray = function(arr) {
	if(!_.isArray(arr)) return false;
	if (_.isEmpty(arr)) return true;

	return functionHelper.filter(function(i) {
		return isInt(i);
	})(arr).length;
};

module.exports.arrayNotEmpty = function(arr) {
	if(!_.isArray(arr)) return false;

	return !_.isEmpty(arr);
};

module.exports.isInIntArray = function(str, arr) {
	return _.isArray(arr) && ~arr.indexOf(parseInt(str)); // ~-1 == 0 which is false
};

module.exports.replace = function (str, chars) {
	return str.replace(new RegExp('[' + chars + ']+', 'g'), '');
};

module.exports.any = function (obj, props) {
	var props = _.rest(arguments, 1);
	var key;
	for(var i = 0, c = props.length; i < c; i++) {
		key = props[i];
		if (obj.hasOwnProperty(key) &&
			typeof(obj[key]) !== 'undefined' &&
			obj[key] !== null &&
			obj[key] !== '') {

			return true;
		}
	}
	return false;
};
