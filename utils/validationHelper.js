"use strict";
var nv = require('validator');
var validationMethods = require('./validationMethods.js');

nv.Validator.prototype.error = function (msg) {
	this._errors.push(msg);
	return this;
};

nv.Validator.prototype.getErrors = function () {
	return this._errors.length ? new Error(this._errors.join(', ')) : null;
};

nv.Validator.prototype.isIntArray = function () {
	if (!validationMethods.isIntArray(this.str))
		this.error(this.msg || 'Value is not an integer array');
	return this;
};

nv.Validator.prototype.arrayNotEmpty = function () {
	if (!validationMethods.arrayNotEmpty(this.str))
		this.error(this.msg || 'Value is empty');
	return this;
};

nv.Validator.prototype.isInIntArray = function (arr) {
	if (!validationMethods.isInIntArray(this.str, arr))
		this.error(this.msg || 'Value is not in integer array');
	return this;
};

nv.Validator.prototype.clearErrors = function () {
	this._errors = [];
};

nv.Filter.prototype.replace = function (chars) {
	if (!chars) return this;
	this.modify(validationMethods.replace(this.str, chars)); // sets this.str
	return this.wrap(this.str);
}

//feels amorous and is idempotent
module.exports = function() {
	var o = new nv.Validator();
	o.sanitize = nv.sanitize;
	return o;
};
