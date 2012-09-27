module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		frontendConfig: {
			webroot: './grunt-tasks/test'
		},
		frontend: {
			css: {
				src: './grunt-tasks/test/css',
				dest: './grunt-tasks/test/c'
			},
			js: {
				'./grunt-tasks/test/j/f1.js': ['./grunt-tasks/test/file1.js', './grunt-tasks/test/file2.js']
			}
		}
	});

	// Load tasks from "grunt-sample" grunt plugin installed via Npm.
	grunt.loadTasks('grunt-tasks');

	// Default task.
	grunt.registerTask('default', 'frontend');
};