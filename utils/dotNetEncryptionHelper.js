"use strict";
var _ = require('lodash');
var crypto = require('crypto');
var base64UrlEncoder = require('./base64UrlEncoder.js');
var Hashids = require("hashids");
var hashChars = 'abcdefghjkmnpqrstvwxyz23456789';
var hashIdsSalt = '&^%#mansweatstuB3chorizoA8ubefee&^%33cu~guy666t';
var termChars = "-0";
var newEncryptionRegex = /-0$/;

module.exports.isNewEncryption = function(input) {
	return newEncryptionRegex.test(input);
};

module.exports.encryptNumberForUrl = function (input) {
	if (_.isString(input))
		input = parseInt(input);
	if (_.isNaN(input))
		return null;

	var hashids = new Hashids(hashIdsSalt, 0, hashChars);
	return hashids.encrypt(input) + termChars;
};

module.exports.encryptNumbersForUrl = function (input) {
	if (!_.isArray(input))
		return null;

	var hashids = new Hashids(hashIdsSalt, 0, hashChars);
	return hashids.encrypt(input) + termChars;
};

module.exports.decryptNumberFromUrl = function (input) {
	var result = exports.decryptNumbersFromUrl(input);
	if(!_.isArray(result) || _.isEmpty(result))
		return null;

	return result.pop();
};

module.exports.decryptNumbersFromUrl = function (input) {
	if(!input) return null;
	if(!_.isString(input)) input = input.toString();

	input = input.toLowerCase().split(termChars).shift();

	var hashids = new Hashids(hashIdsSalt, 0, hashChars);
	var decrypted = hashids.decrypt(input);

	if (_.isEmpty(decrypted) || !_.isArray(decrypted)) return null;

	return decrypted;
};

var password = 'tuB3a6ep9etrecRuTuqUZepRetred4tReNA8u33curaSutedequVuG5vUVaxerEt';
var key, iv;

module.exports.encryptForUrlOld = function (input) {
	if (!(input instanceof Buffer) && !_.isString(input))
		input = input.toString();

	var encrypted = encrypt(input);
	if (!encrypted) return;
	return encodeURIComponent(base64UrlEncoder.encode(encrypted));
};

module.exports.decryptFromUrlOld = function (input) {
	input = decodeURIComponent(input).trim();

	var encrypted = base64UrlEncoder.decodeToString(input);
	return decrypt(encrypted);
};

function decrypt(input) {
	if (!key) createKeyAndIv();
	if(!input) return null;
	var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
	var decrypted = decipher.update(input, 'base64', 'utf8') + decipher.final('utf8');
	return decrypted;
}

function encrypt(input) {
	if (!key) createKeyAndIv();
	var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
	var encrypted = cipher.update(input, 'utf8', 'base64') + cipher.final('base64');
	return encrypted;
}

function createKeyAndIv() {
	key = crypto.createHash('md5').update(password).digest('hex');
	iv = crypto.createHash('md5').update(password + key).digest('hex').slice(0, 16);
}