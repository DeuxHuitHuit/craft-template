module.exports = (grunt) => {
	'use strict';

	grunt.config.merge({
		watch: {
			files: [
				'templates/**/*.twig',
				'tailwind.config.js',
				'web/assets/css/**/*.css',
				'!web/assets/css/pre-build/**'
			],
			tasks: ['clean:css', 'postcss:build', 'ftp_push:dev'],
			options: {
				spawn: false,
				livereload: true,
				livereloadOnError: true
			}
		}
	});
};
