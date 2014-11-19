var _ = require('lodash');
var fs = require('fs');
var path = require('path');

function getFilePathsRecursive(params, cb) {
	var results = [];
	if (!params.dir)
		return cb(new Error('dir required'));

	fs.readdir(params.dir, function (err, list) {
		if (err) return cb(err);

		var pending = list.length;
		if (!pending)
			return cb(null, results);

		list.forEach(function (file) {
			fs.stat(params.dir + '/' + file, function (err, stat) {
				if (stat.isDirectory()) {
					return getFilePathsRecursive({dir: params.dir + '/' + file, extensionFilter: params.extensionFilter}, function (err, res) {
						if (params.extensionFilter)
							res = _.filter(res, function (item) {
								return path.extname(item) == params.extensionFilter;
							});

						results = results.concat(res);
						if (!--pending)
							cb(null, results);
					});
				}

				if (!params.extensionFilter || path.extname(file) == params.extensionFilter)
					results.push(params.dir + '/' + file);

				if (!--pending)
					cb(null, results);
			});
		});
	});
}
module.exports = getFilePathsRecursive;