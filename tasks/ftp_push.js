module.exports = (grunt) => {

	const authFile = grunt.file.readJSON('.vscode/sftp.json');

	grunt.config.merge({
		ftp_push: {
			options: {
				host: authFile.host,
				port: authFile.port || 21,
				dest: authFile.remotePath,
				username: authFile.username,
				password: authFile.password,
				hideCredentials: false,
				secure: authFile.secure
			},
			dev: {
				files: [{
					expand: true,
					src: ['web/assets/css/pre-build/**']
				}]
			},
			css: {
				files: [{
					expand: true,
					src: ['web/assets/css/<%= pkg.name %>.min.css']
				}]
			},
			js: {
				files: [{
					expand: true,
					src: [
						'web/assets/js/<%= pkg.name %>.min.js',
						'web/assets/js/<%= pkg.name %>.es5.min.js'
					]
				}]
			},
			build: {
				files: [{
					expand: true,
					src: ['build.json']
				}]
			}
		}
	});
};
