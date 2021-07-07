module.exports = (grunt) => {
	'use strict';

	const jsJson = grunt.file.readJSON('js.json');
	const jsFiles = jsJson.sources
		.map((source) => {
			return `web/assets/js/${source}`;
		})
		.filter((source) => {
			return !source.endsWith('.min.js');
		});

	grunt.config.merge({
		eslint: {
			options: {
				configFile: '.eslintrc.js'
			},
			target: jsFiles
		}
	});
};
