module.exports = (grunt) => {

	const jsJson = grunt.file.readJSON('js.json');
	let jsFiles = jsJson.sources.map((source) => { return `web/assets/js/${source}` });
	jsFiles = jsJson.before.map((source) => { return `web/assets/js/libs/${source.split('/').pop()}` }).concat(jsFiles);

	grunt.config.merge({
		concat: {
			options: {
				stripBanners: true,
				banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			css: {
				src: ['web/assets/css/pre-build/**/*.css'],
				dest: 'web/assets/css/<%= pkg.name %>.css'
			},
			js: {
				src: jsFiles,
				dest: 'web/assets/js/<%= pkg.name %>.js'
			}
		}
	});
};
