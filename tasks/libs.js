const axios = require('axios');

module.exports = (grunt) => {

	const jsJson = grunt.file.readJSON('js.json');
	const libs = jsJson.before.concat(jsJson.before);

	grunt.config.merge({
		libs: {
			options: {
				dest: ['web/assets/js/libs'],
				libs: libs
			}
		}
	});

	grunt.registerTask('libs', 'Fetch all libs at cdns inside js.json', async () => {
		const done = grunt.task.current.async();
		const options = grunt.task.current.options();

		for (let index = 0; index < options.libs.length; index++) {
			const lib = options.libs[index];
			const filename = lib.split('/').pop();
			const r = await axios.get(lib);

			if (r.status === 200) {
				grunt.log.writeln(`Fetched ${lib}`);
				grunt.file.write(`web/assets/js/libs/${filename}`, r.data);
			} else {
				grunt.log.error(`Error while fetching ${lib}`);
			}
		}

		done();
	});
};
