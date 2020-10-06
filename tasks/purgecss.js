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
						/^is-/,
						/^has-/
					],
					whitelistPatternsChildren: [
						/^is-/,
						/^has-/
					],
					extractors: [
						{
							extractor: (content) => {
								const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
								const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
								return broadMatches.concat(innerMatches);
							},
							extensions: ['twig', 'js']
						}
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
