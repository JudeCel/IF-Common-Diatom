"use strict";
var _ = require('lodash');
var test = require('tap').test;
var arrayHelper = require('..').utils.arrayHelper;

test('strArrayToIntArray converts string array to int array', function (t) {
	var expected = [1, 2, 3, 1234567890];
	var input = ['1', '2', '3', '1234567890'];
	var result = arrayHelper.strArrayToIntArray(input);
	t.deepEqual(expected, result);

	expected = [0];
	input = ['0'];
	result = arrayHelper.strArrayToIntArray(input);
	t.deepEqual(expected, result);

	expected = [168000100, 168000200, 168000300, 168000400];
	input = ["168000100", "168000200", "168000300", "168000400"];
	result = arrayHelper.strArrayToIntArray(input);
	t.deepEqual(expected, result);

	t.end();
});

test('strArrayToFloatArray converts string array to float array', function (t) {
	var expected = [1.1, 2.2, 3.75, 1234567890];
	var input = ['1.1', '2.2', '3.75', '1234567890'];
	var result = arrayHelper.strArrayToFloatArray(input);

	t.deepEqual(expected, result);
	t.end();
});

test('split converts array into 2-d array of chunks', function (t) {
	t.test('Splits even length array into even chunks',function(t) {
		var input = [0,1,2,3,4,5,6,7,8,9];
		var expected = [[0,1],[2,3],[4,5],[6,7],[8,9]];
		var perGroup = 2;

		var result = arrayHelper.split(input, perGroup);
		t.deepEqual(expected, result);
		t.end();
	});

	t.test('Splits odd length array into odd chunks',function(t) {
		var input = [0,1,2,3,4,5,6,7];
		var expected = [[0,1,2],[3,4,5],[6,7]];
		var perGroup = 3;

		var result = arrayHelper.split(input, perGroup);
		t.deepEqual(expected, result);
		t.end();
	});

	t.test('Splits array into 1 chunk if chunk-size is > array.length',function(t) {
		var input = [0,1,2,3,4];
		var expected = [[0,1,2,3,4]];
		var perGroup = 7;

		var result = arrayHelper.split(input, perGroup);
		t.deepEqual(expected, result);
		t.end();
	});

	t.test('Splits array into array.length chunks if chunk-size is 1',function(t) {
		var input = [0,1,2,3,4];
		var expected = [[0],[1],[2],[3],[4]];
		var perGroup = 1;

		var result = arrayHelper.split(input, perGroup);
		t.deepEqual(expected, result);
		t.end();
	});

	t.end();
});

test('splat applies function to each element in input array', function (t) {
	var expected = [1, 4, 9];
	var input = [1, 2, 3];
	var fx = function (x) { return x * x; };
	var result = arrayHelper.splat(fx)(input);
	t.deepEqual(expected, result);
	t.end();
});

test('arrayPick applies pick to all objects in an array', function (t) {
	var input = _.map(_.range(2), function(i) {
		return { id:i, name:'Test'+i, testProp:'Test'+i};
	});
	var expected = [
		{ id:0, name:'Test0'},
		{ id:1, name:'Test1'}
	];
	var result = arrayHelper.arrayPick(input, 'id', 'name');
	t.deepEqual(expected, result);
	t.end();
});

test('arrayPick handles an array of props to pick', function (t) {
	var input = _.map(_.range(2), function(i) {
		return { id:i, name:'Test'+i, testProp:'Test'+i, testProp2:"Test"+i};
	});
	var expected = [
		{ id:0, name:'Test0'},
		{ id:1, name:'Test1'}
	];
	var result = arrayHelper.arrayPick(input, ['id', 'name']);
	t.deepEqual(expected, result);
	t.end();
});

test('arrayOmit applies omit to all objects in an array', function (t) {
	var input = _.map(_.range(2), function(i) {
		return { id:i, name:'Test'+i, testProp:'Test'+i};
	});
	var expected = [
		{ id:0, name:'Test0'},
		{ id:1, name:'Test1'}
	];
	var result = arrayHelper.arrayOmit(input, 'testProp');
	t.deepEqual(expected, result);
	t.end();
});

test('arrayOmit handles an array of props to omit', function (t) {
	var input = _.map(_.range(2), function(i) {
		return { id:i, name:'Test'+i, testProp:'Test'+i, testProp2:"Test"+i};
	});
	var expected = [
		{ id:0, name:'Test0'},
		{ id:1, name:'Test1'}
	];
	var result = arrayHelper.arrayOmit(input, ['testProp','testProp2']);
	t.deepEqual(expected, result);
	t.end();
});

test('arrayToHash creates an object from an array of objects and a key-property', function (t) {
	var input = _.map(_.range(2), function(i) {
		return { id:i, name:'Test'+i};
	});
	var expected = {
		'0': { id:0, name:'Test0'},
		'1': { id:1, name:'Test1'}
	};
	var result = arrayHelper.arrayToHash('id')(input);
	t.deepEqual(expected, result);
	t.end();
});

test('primitiveArrayToHash creates an object from an array of primitives', function (t) {
	var input = _.range(2);
	var expected = {
		0: 0,
		1: 1
	};
	var result = arrayHelper.primitiveArrayToHash(input);
	t.deepEqual(expected, result);
	t.end();
});
