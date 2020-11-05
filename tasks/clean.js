module.exports = (grunt) => {
	grunt.config.merge({
		clean: {
			css: ['web/assets/css/pre-build/**/*.*'],
			'css-main': ['web/assets/css/pre-build/main.css'],
			'css-utils': ['web/assets/css/pre-build/utils.css'],
			js: ['web/assets/js/libs/*.*']
		}
	});
};
