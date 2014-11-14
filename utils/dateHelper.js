"use strict";
var dateFormat = require('dateformat');

module.exports.utcNow = function () {
	var now = new Date();
	return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
};

module.exports.formatDateFromDatestamp = function (datestamp) {
	if(!datestamp) return null;
	var completionDate = Date.parse(datestamp);
	return exports.formatDateFromDate(completionDate);
};

// ISO 8601 Calendar date
module.exports.dateStringFromDate = function (date) {
	if(!date) return null;
	return dateFormat(date, "isoDate");
};

//returns format 18-May-1979
module.exports.formatDateFromDate = function (date) {
	if(!date) return null;
	return dateFormat(date, "dd-mmm-yyyy");
};

module.exports.utcOffsetByDays = function (numberOfDays) {
	var timeZoneDate = new Date();
	var simpleDate = new Date(Date.UTC(timeZoneDate.getUTCFullYear(), timeZoneDate.getUTCMonth(), timeZoneDate.getUTCDate(), 0, 0, 0));
	var dayOfMonth = simpleDate.getDate();
	simpleDate.setDate(dayOfMonth + numberOfDays);
	return simpleDate;
};

module.exports.utcOffsetByDaysFormatted = function (numberOfDays) {
	var timeZoneDate = new Date();
	var simpleDate = new Date(Date.UTC(timeZoneDate.getUTCFullYear(), timeZoneDate.getUTCMonth(), timeZoneDate.getUTCDate(), 0, 0, 0));
	var dayOfMonth = simpleDate.getDate();
	simpleDate.setDate(dayOfMonth + numberOfDays);
	return dateFormat(simpleDate, "yyyy-mm-dd HH:MM:ss", true);
};
