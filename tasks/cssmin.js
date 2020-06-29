module.exports = (grunt) => {
	grunt.config.merge({
		cssmin: {
			options: {
				report: 'min'
			},
			target: {
				files: [{
					expand: true,
					src: ['web/assets/css/dist/*.css', '!web/assets/css/dist/*.min.css'],
					ext: '.min.css'
				}]
			}
		}
	});
};
