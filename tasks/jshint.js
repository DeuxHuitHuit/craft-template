module.exports = function shopify(grunt) {
	'use strict';

	const jsJson = grunt.file.readJSON('js.json');
	const jsFiles = jsJson.sources.map((source) => { return `web/assets/js/${source}` }).filter((source) => { return !source.endsWith('.min.js'); });

	grunt.config.merge({
		jshint: {
			options: {
				esversion: 6,
				bitwise: false,
				camelcase: false,
				curly: true,
				eqeqeq: true,
				forin: true,
				freeze: true,
				immed: false, //
				latedef: true, // late definition
				newcap: true, // capitalize ctos
				noempty: true,
				nonew: true, // no new ..()
				noarg: true,
				plusplus: false,
				quotmark: 'single',
				undef: true,
				maxparams: 5,
				maxdepth: 5,
				maxstatements: 30,
				maxlen: 100,
				nonbsp: true,

				// relax options
				regexp: true,
				strict: true,
				trailing: false,
				sub: true, // [] notation
				smarttabs: true,
				lastsemic: false, // enforce semicolons

				// env
				browser: true,

				globals: {
					jQuery: true,
					console: true,
					App: true,
					Loader: true,
					_: true,
					module: true,
					google: true,
					CSS3: true,
					Shopify: true
				}
			},
			all: jsFiles
		}
	});

};
