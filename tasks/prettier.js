module.exports = (grunt) => {
	const jsJson = grunt.file.readJSON('js.json');
	const jsFiles = jsJson.sources
		.map((source) => {
			return `web/assets/js/${source}`;
		})
		.filter((source) => {
			return !source.endsWith('.min.js');
		});

	grunt.config.merge({
		prettier: {
			files: {
				src: jsFiles,
			},
		},
	});
};
