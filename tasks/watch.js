module.exports = (grunt) => {
	'use strict';

	grunt.config.merge({
		watch: {
			twig: {
				files: ['templates/**/*.twig'],
				tasks: ['noop']
			},
			css: {
				files: ['web/assets/css/**/*.css', '!web/assets/css/pre-build/**'],
				tasks: ['clean:css-main', 'postcss:main', 'ftp_push:dev']
			},
			tailwind: {
				files: ['tailwind.config.js', '!web/assets/css/pre-build/**'],
				tasks: ['clean:css-utils', 'postcss:utils', 'ftp_push:dev']
			},
			options: {
				spawn: false,
				livereload: true,
				livereloadOnError: true
			}
		}
	});
};
