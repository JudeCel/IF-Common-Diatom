"use strict";
var _ = require('lodash');
var test = require('tap').test;
var mtypes = require('..').mtypes;
var mtypeIdLookup = require('..').utils.mtypeIdLookup;

test('getLookup tests', function (t) {
	t.test('getLookup converts int id to mtype string', function (t) {
		var input = mtypes.accountStatus.active;
		var expected = 'Active';
		var result = mtypeIdLookup.getLookup(input);
		t.equal(result, expected);
		t.end();
	});

	t.test('getLookup converts string id to mtype string', function (t) {
		var input = mtypes.accountStatus.active.toString();
		var expected = 'Active';
		var result = mtypeIdLookup.getLookup(input);
		t.equal(result, expected);
		t.end();
	});

	t.end();
});

test('getLookups tests', function (t) {
	t.test('getLookups converts passed props with int values into mtype strings', function (t) {
		var mtypeValues = [mtypes.accountStatus.active, mtypes.accountStatus.cancelled];
		var stringValues = ['Active', 'Cancelled'];

		var input = [];
		var expected = [];

		for(var i = 0; i < 2; i++) {
			input.push({id: i, status: mtypeValues[i]});
			expected.push({id: i, status: stringValues[i]});
		}

		var result = mtypeIdLookup.getLookups(input, 'status');
		t.deepEqual(result, expected);
		t.end();
	});

	t.test('getLookups converts multiple passed props with int values into mtype strings', function (t) {
		var mtypeValues = [mtypes.accountStatus.active, mtypes.accountStatus.cancelled];
		var stringValues = ['Active', 'Cancelled'];

		var input = [];
		var expected = [];

		for(var i = 0; i < 2; i++) {
			input.push({id: i, status: mtypeValues[i], status2: mtypeValues[i]});
			expected.push({id: i, status: stringValues[i], status2: stringValues[i]});
		}

		var result = mtypeIdLookup.getLookups(input, 'status','status2');
		t.deepEqual(result, expected);
		t.end();
	});

	t.end();
});
