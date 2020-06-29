module.exports = (grunt) => {
	grunt.config.merge({
		purgecss: {
			target: {
				options: {
					content: [
						'templates/**/*.twig',
						'web/assets/js/**/*.js'
					],
					whitelist: [

					],
					whitelistPatterns: [

					]
				},
				files: [{
					expand: true,
					src: ['web/assets/css/<%= pkg.name %>.css']
				}]
			}
		}
	});
};
