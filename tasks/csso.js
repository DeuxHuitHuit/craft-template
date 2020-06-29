module.exports = (grunt) => {

	grunt.config.merge({
		csso: {
			compress: {
				options: {
					report: 'gzip',
					filename: '<%= pkg.name %>.min.css'
				},
				files: {
					'web/assets/css/<%= pkg.name %>.min.css': [
						'web/assets/css/<%= pkg.name %>.css'
					]
				}
			}
		}
	});

};
