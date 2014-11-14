var test = require('tap').test;
var mfCommon = require('..');
var base64UrlEncoder = mfCommon.utils.base64UrlEncoder;

test('encode / decode works with strings', function (t) {
	var text = 'This is some text';
	var base64Text = new Buffer(text).toString('base64');
	var urlEncoded = base64UrlEncoder.encode(base64Text);
	var urlDecoded = base64UrlEncoder.decodeToString(urlEncoded);

	t.equal(base64Text, urlDecoded);
	t.end();
});

test('encode / decode works with Buffers', function (t) {
	var text = 'This is some text';
	var buffer = new Buffer(text);
	var urlEncoded = base64UrlEncoder.encode(buffer);
	var decodedBuffer = base64UrlEncoder.decodeToBuffer(urlEncoded);

	t.deepEqual(buffer, decodedBuffer);
	t.end();
});
