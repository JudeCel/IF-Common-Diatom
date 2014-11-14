var test = require('tap').test;
var util = require('util');

test("validationHelper doesn't hold on to the errors of others", function (t) {
	var validator0 = require('../utils/validationHelper.js')();
	validator0.check('abc').notEmpty().isInt();
	validator0.check(1.25).notEmpty().isInt();
	var errors0 = validator0.getErrors();
	t.ok(errors0);

	var validator1 = require('../utils/validationHelper.js')();
	validator1.check(1).notEmpty().isInt();
	var errors1 = validator1.getErrors();
	console.log(errors1);
	t.notOk(errors1);

	t.end();
});

test('getErrors works', function (t) {
	var validator = require('../utils/validationHelper.js')();
	validator.clearErrors();
	validator.check('abc').notEmpty().isInt();
	validator.check(1.25).notEmpty().isInt();
	var errors = validator.getErrors();
	t.ok(errors);
	t.end();
});

test('getErrors wraps error string-array into Error object', function (t) {
	var validator = require('../utils/validationHelper.js')();
	validator.clearErrors();
	validator.check('abc').notEmpty().isInt();
	validator.check(1.25).notEmpty().isInt();
	var errors = validator.getErrors();
	t.ok(util.isError(errors));
	t.end();
});

test('wraps node-validator and exposes sanitize', function (t) {
	var validator = require('../utils/validationHelper.js')();
	validator.clearErrors();
	var i = validator.sanitize('125').toInt();
	t.equal(i,125);
	t.end();
});

test('wraps node-validator and exposes sanitize.replace', function (t) {
	var validator = require('../utils/validationHelper.js')();
	validator.clearErrors();
	var result = validator.sanitize("$2,500.25").replace("$,");
	t.equal(result,"2500.25");
	t.end();
});
