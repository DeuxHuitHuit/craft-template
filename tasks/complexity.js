module.exports = (grunt) => {

	const jsJson = grunt.file.readJSON('js.json');
	const jsFiles = jsJson.sources.map((source) => { return `web/assets/js/${source}` }).filter((source) => { return !source.endsWith('.min.js'); });

	grunt.config.merge({
		complexity: {
			generic: {
				src: jsFiles,
				exclude: [
					'web/assets/js/utils/keys.js'
				],
				options: {
					errorsOnly: false,
					cyclomatic: 15,
					halstead: 25,
					maintainability: 90
				}
			}
		}
	});
};
