module.exports = (grunt) => {
	'use strict';

	grunt.config.merge({
		watch: {
			twig: {
				files: [
					'templates/**/*.twig'
				],
				tasks: ['noop']
			},
			css: {
				files: [
					'tailwind.config.js',
					'web/assets/css/**/*.css',
					'!web/assets/css/pre-build/**'
				],
				tasks: ['clean:css', 'postcss', 'ftp_push:dev']
			},
			options: {
				spawn: false,
				livereload: true,
				livereloadOnError: true
			}
		}
	});
};
