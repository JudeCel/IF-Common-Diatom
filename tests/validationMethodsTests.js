var test = require('tap').test;
var validator = require('../utils/validationMethods.js');

test('isInt works', function (t) {
	t.ok(validator.isInt(1), "1 is an int");
	t.ok(validator.isInt('1'), "'1' is an int");
	t.ok(validator.isInt(1.0), "1.0 is an int");
	t.notOk(validator.isInt(1.1), "1.1 is not an int");
	t.notOk(validator.isInt('a'), "'a' is not an int");
	t.notOk(validator.isInt([]), "[] is not an int");
	t.notOk(validator.isInt({}), "{} is not an int");
	t.notOk(validator.isInt(), "(no param) is not an int");
	t.notOk(validator.isInt(null), "null is not an int");
	t.end();
});

test('isIntArray works', function (t) {
	t.ok(validator.isIntArray([0]), "[0] is an int array");
	t.notOk(validator.isIntArray('[0]'), "'[0]' is not an int array");
	t.ok(validator.isIntArray([1.0]), "[1.0] is an int array");
	t.notOk(validator.isIntArray([1.1]), "[1.1] is not an int array");
	t.notOk(validator.isIntArray('a'), "'a' is not an int array");
	t.notOk(validator.isIntArray([]), "[] is not an int array");
	t.notOk(validator.isIntArray({}), "{} is not an int array");
	t.notOk(validator.isIntArray(), "(no param) is not an int array");
	t.notOk(validator.isIntArray(null), "null is not an int array");
	t.end();
});

test('arrayNotEmpty works', function (t) {
	t.ok(validator.arrayNotEmpty([0]), "[0] is an not empty array");
	t.notOk(validator.arrayNotEmpty('[0]'), "'[0]' is not an array, so it is empty");
	t.ok(validator.arrayNotEmpty([1.0]), "[1.0] is not an empty array");
	t.ok(validator.arrayNotEmpty([null]), "[null] is not an empty array");
	t.notOk(validator.isIntArray('a'), "'a' is not an array, so it is empty");
	t.notOk(validator.isIntArray([]), "[] is an empty array");
	t.notOk(validator.isIntArray({}), "{} is not an array, so it is empty");
	t.notOk(validator.isIntArray(), "(no param) is not an array, so it is empty");
	t.notOk(validator.isIntArray(null), "null is not an array, so it is empty");
	t.end();
});

test('isInIntArray works', function (t) {
	t.ok(validator.isInIntArray(0, [0]), "0 is in array [0]");
	t.ok(validator.isInIntArray('0', [0]), "'0' is in array [0]");
	t.notOk(validator.isInIntArray(0, ['0']), "0 is in array ['0']");
	t.notOk(validator.isInIntArray(0, []), "0 is not in []");
	t.notOk(validator.isInIntArray(0, null), "0 is not in null");
	t.notOk(validator.isInIntArray(0, ''), "0 is not in ''");
	t.notOk(validator.isInIntArray(null, null), "null is not in null");
	t.end();
});

test('replace works', function (t) {
	t.equal(validator.replace("$2500.25", "$"), "2500.25");
	t.equal(validator.replace("$2,500.25", "$,"), "2500.25");
	t.end();
});

test('any works', function (t) {
	var obj = {p1: "test"};
	t.ok(validator.any(obj, 'p0', 'p1', 'p2'), "any returns true when 1 property is defined");

	var obj = {};
	t.notOk(validator.any(obj, 'p0', 'p1', 'p2'), "any returns false when no properties are defined");

	var obj = {p3:'test'};
	t.notOk(validator.any(obj, 'p0', 'p1', 'p2'), "any returns false when none of the specified properties are defined");

	t.end();
});
