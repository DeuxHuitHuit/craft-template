module.exports = (grunt) => {
	grunt.config.merge({
		clean: {
			css: ['web/assets/css/pre-build/**/*.*'],
			js: ['web/assets/js/libs']
		}
	});
};
