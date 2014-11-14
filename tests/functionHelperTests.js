"use strict";
var _ = require('lodash');
var test = require('tap').test;
var fn = require('..').utils.functionHelper;
var arrayHelper = require('..').utils.arrayHelper;

test('wrapWithCb tests', function (t) {
	t.test('1 param and a cb works', function (t) {
		var testFx = function (p0, cb) {
			cb(null, p0); // node standard for callback is err,res
		};
		fn.wrapWithCb(testFx, 'test')(function (err, res) {
			t.equal(res, 'test');
			t.end();
		});
	});

	t.test('5 params and a cb works', function (t) {
		var testFx = function () {
			// get an array of all the args minus the cb
			var args = _.rest(arguments, 0);
			var cb = args.pop();
			cb(null, args); // node standard for callback is err,res
		};
		fn.wrapWithCb(testFx, 'p0value','p1value','p2value','p3value','p4value')(function (err, res) {
			t.equal(res[0], 'p0value');
			t.equal(res[1], 'p1value');
			t.equal(res[2], 'p2value');
			t.equal(res[3], 'p3value');
			t.equal(res[4], 'p4value');
			t.end();
		});
	});

	t.end();
});

test('profileWithCb works', function (t) {
	function fx(name, cb) {
		t.equal(name, 'test');
		setTimeout(cb.apply(null, [null, 'result']), 100);
	}

	function fxCb(err, res) {
		t.equal(res, 'result');
		t.end();
	}

	fn.profileWithCb(fx, 'test', fxCb);
});

test('filter applies function to each element in input array', function (t) {
	var expected = [0, 2, 4];
	var input = [0, 1, 2, 3, 4, 5];
	var fx = function (x) {
		return x % 2 === 0;
	};
	var result = fn.filter(fx)(input);
	t.deepEqual(expected, result);
	t.end();
});

test('guard ignores bad method args', function (t) {
	var fxCalled = false;
	var fx = fn.guard(function (x) {
		fxCalled = true;
	});
	arrayHelper.splat(fx)([null, undefined]);

	t.notOk(fxCalled, 'guard ignored all bad args');
	t.end();
});

test('guard allows good method args', function (t) {
	var fxCalls = 0;
	var testArgs = ['test', 1.0, {name: 'Test'}];
	var fx = fn.guard(function (x) {
		fxCalls++;
	});
	arrayHelper.splat(fx)(testArgs);

	t.equal(fxCalls, testArgs.length, 'guard allowed all valid args');
	t.end();
});

test('guardWithDefault uses default args when bad args found', function (t) {
	var expected = 3;
	var result = 0;
	var fx = fn.guardWithDefault(function (x, y) {
		result = x + y;
	}, [1, 2]);
	fx(null, null);

	t.equal(expected, result);
	t.end();
});
