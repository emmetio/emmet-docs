module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		frontendConfig: {
			srcWebroot: './src/files',
			webroot: './out'
		},

		copy: {
			'./out/j/': './src/files/js/jquery-*.js'
		},

		frontend: {
			css: {
				src: './src/files/css',
				dest: './out/c'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadTasks('grunt-tasks');


	// Default task.
	grunt.registerTask('default', 'copy frontend');
};