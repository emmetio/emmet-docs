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
			},
			js: {
				'./out/j/movie.js': [
					'./src/files/codemirror-movie/src/codemirror2/codemirror.js',
					'./src/files/codemirror-movie/src/codemirror2/css.js',
					'./src/files/codemirror-movie/src/codemirror2/xml.js',
					'./src/files/codemirror-movie/src/codemirror2/javascript.js',
					'./src/files/codemirror-movie/src/codemirror2/htmlmixed.js',
					'./src/files/codemirror-movie/src/lib/underscore.js',
					'./src/files/codemirror-movie/src/lib/tween.js',
					'./src/files/codemirror-movie/src/lib/emmet.min.js',
					'./src/files/codemirror-movie/src/scenario.js',
					'./src/files/codemirror-movie/src/scenario.outline.js',
					'./src/files/codemirror-movie/src/scenario.tooltip.js',
					'./src/files/codemirror-movie/src/scenario.prompt.js',
					'./src/files/js/movie-definition.js',
					'./src/files/js/misc.js'
				],

				'./out/j/cheatsheet.js': [
					'./src/files/js/cheatsheet.js',
					'./src/files/js/cheatsheet-css.js',
					'./src/files/js/cheatsheet-controller.js'
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadTasks('grunt-tasks');


	// Default task.
	grunt.registerTask('default', 'copy frontend');
};