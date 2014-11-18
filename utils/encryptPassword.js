var crypto = require('crypto');

function EncryptPassword(params) {
	var salt = params.userId.toString();
	var password = params.password;

	var range = salt.length / 3 | 0;
	var saltyPassword = salt.substring(range) + password + salt.substring(0, range);
	return crypto.createHash('md5').update(saltyPassword, 'utf8').digest('base64');
}
module.exports = EncryptPassword;
