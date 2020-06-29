module.exports = (grunt) => {
	grunt.config.merge({
		watch: {
			tailwind: {
				files: ['tailwind.config.js'],
				tasks: ['postcss', 'ftp_push:dev']
			},
			twig: {
				files: [
					'templates/**/*.twig'
				],
				tasks: ['noop']
			},
			catch: {
				files: [
					'web/assets/css/**/*.css',
					'!web/assets/css/pre-build/**'
				],
				tasks: ['postcss', 'ftp_push:dev']
			},
			options: {
				spawn: false,
				livereload: true,
				livereloadOnError: true
			}
		}
	});

	grunt.event.on('watch', function (action, filepath) {
		let file = filepath.replace(/\\/g, '/');

		if (file === 'tailwind.config.js') {
			return;
		}

		if (!file.endsWith('.css')) {
			grunt.config.set('ftp_push.dev.files.src', [{
				expand: true,
				src: []
			}]);
			grunt.config.set('postcss.options.files.src', []);
		} else {
			grunt.config.set('ftp_push.dev.files.src', [{
				expand: true,
				src: [file]
			}]);
			grunt.config.set('postcss.options.files.src', [file]);
		}
	});
};
