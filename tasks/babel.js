module.exports = (grunt) => {
	grunt.config.merge({
		babel: {
			es5: {
				options: {
					sourceMap: false,
					presets: [[
						'@babel/preset-env',
						{
							modules: false,
							targets: {
								ie: 11
							}
						}
					]],
					minified: true,
					comments: false,
					plugins: []
				},
				files: {
					'web/assets/js/<%= pkg.name %>.es5.min.js': 'web/assets/js/<%= pkg.name %>.js'
				}
			},
			modern: {
				options: {
					sourceMap: false,
					presets: [[
						'@babel/preset-env',
						{
							modules: false,
							targets: {
								chrome: 80
							}
						}
					]],
					minified: true,
					comments: false,
					plugins: []
				},
				files: {
					'web/assets/js/<%= pkg.name %>.min.js': 'web/assets/js/<%= pkg.name %>.js'
				}
			}
		}
	});
};
