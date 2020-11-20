module.exports = (grunt) => {
	'use strict';

	grunt.config.merge({
		env: {
			build: {
				NODE_ENV: 'production'
			}
		}
	});
};
