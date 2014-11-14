var test = require('tap').test;
var mfCommon = require('..');
var toPascalCase = mfCommon.utils.jsonFixer.toPascalCase;

test('converts camelCase keys of simple object to PascalCase', function (t) {
	var camelCasedObject = {
		"$type":"InsiderFocus.Common",
		"key1":1,
		"key2":"Preparing slides"
	};
	var pascalCasedResult = toPascalCase(camelCasedObject);

	t.strictEqual(pascalCasedResult.$type, "Test");
	t.strictEqual(pascalCasedResult.Key1, camelCasedObject.key1);
	t.strictEqual(pascalCasedResult.Key2, camelCasedObject.key2);
	t.end();
});

test('should return null for a key with a null value after processing the object', function (t) {
	var objectWithNullValue = {
		"testKey":null
	};
	var result = toPascalCase(objectWithNullValue);

	t.strictEqual(result.TestKey, null);
	t.end();
});

test('converts camelCase keys of complex object to PascalCase', function (t) {
	var camelCasedObject = {
		"$type":"InsiderFocus.Common",
		"key1":1,
		"key2":"Preparing slides",
		"key3":{
			"key4":[
				{"key5":"some value"},
				{"key6":"some value"}
			]
		}
	};
	var pascalCasedResult = toPascalCase(camelCasedObject);

	t.strictEqual(pascalCasedResult.$type, "Test");
	t.strictEqual(pascalCasedResult.Key1, camelCasedObject.key1);
	t.strictEqual(pascalCasedResult.Key2, camelCasedObject.key2);
	t.equal(pascalCasedResult.Key3.Key4.length, camelCasedObject.key3.key4.length);
	t.strictEqual(pascalCasedResult.Key3.Key4.Key5, camelCasedObject.key3.key4.key5);
	t.end();
});
