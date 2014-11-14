var test = require('tap').test;
var mfCommon = require('..');
var toCamelCase = mfCommon.utils.jsonFixer.toCamelCase;

test('converts PascalCase keys of simple object to camelCase', function (t) {
	var pascalCasedObject = {
		"$type":"InsiderFocus.Common",
		"Key1":1,
		"Key2":"Preparing slides"
	};
	var camelCasedResult = toCamelCase(pascalCasedObject);

	t.strictEqual(camelCasedResult.$type, "test");
	t.strictEqual(camelCasedResult.key1, pascalCasedObject.Key1);
	t.strictEqual(camelCasedResult.key2, pascalCasedObject.Key2);
	t.end();
});

test('should return null for a key with a null value after processing the object', function (t) {
	var objectWithNullValue = {
		"testKey":null
	};
	var result = toCamelCase(objectWithNullValue);

	t.strictEqual(result.testKey, null);
	t.end();
});

test('converts PascalCase keys of complex object to camelCase', function (t) {
	var pascalCasedObject = {
		"$type":"InsiderFocus.Common",
		"Key1":1,
		"Key2":"Preparing slides",
		"Key3":{
			"Key4":[
				{"Key5":"some value"},
				{"Key6":"some value"}
			]
		}
	};
	var camelCasedResult = toCamelCase(pascalCasedObject);

	t.strictEqual(camelCasedResult.$type, "test");
	t.strictEqual(camelCasedResult.key1, pascalCasedObject.Key1);
	t.strictEqual(camelCasedResult.key2, pascalCasedObject.Key2);
	t.equal(camelCasedResult.key3.key4.length, pascalCasedObject.Key3.Key4.length);
	t.strictEqual(camelCasedResult.key3.key4.key5, pascalCasedObject.Key3.Key4.Key5);
	t.end();
});

