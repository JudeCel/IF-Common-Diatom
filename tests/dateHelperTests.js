var test = require('tap').test;
var dateHelper = require('../utils/dateHelper.js');

test("formatDateFromDatestamp parses 1/1/2001", function(t) {
	var formattedDate = dateHelper.formatDateFromDatestamp('1/1/2001');
	t.equal(formattedDate, '01-Jan-2001');
	t.end();
});

test("formatDateFromDatestamp parses 12/31/2001", function(t) {
	var formattedDate = dateHelper.formatDateFromDatestamp('12/31/2001');
	t.equal(formattedDate, '31-Dec-2001');
	t.end();
});

test("dateStringFromDate parses 12/31/2001", function(t) {
	var formattedDate = dateHelper.dateStringFromDate(new Date('12/31/2001'));
	t.equal(formattedDate, '2001-12-31');
	t.end();
});

test("dateStringFromDate parses 1/1/2001", function(t) {
	var formattedDate = dateHelper.dateStringFromDate(new Date('1/1/2001'));
	t.equal(formattedDate, '2001-01-01');
	t.end();
});

test("formatDateFromDate parses 12/31/2001", function(t) {
	var formattedDate = dateHelper.formatDateFromDate(new Date('12/31/2001'));
	t.equal(formattedDate, '31-Dec-2001');
	t.end();
});

test("formatDateFromDate parses 1/1/2001", function(t) {
	var formattedDate = dateHelper.formatDateFromDate(new Date('1/1/2001'));
	t.equal(formattedDate, '01-Jan-2001');
	t.end();
});
