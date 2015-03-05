var path = require('path');
var gulp = require('gulp');
var jsBundler = require('js-bundler');

function np(file) {
	return path.resolve(path.join('node_modules', file));
}

gulp.task('js', function() {
	return gulp.src('./src/files/js/*.js', {base: './src/files'})
		.pipe(jsBundler({
			noParse: [
				np('codemirror-movie/dist/movie.js'), 
				np('emmet-codemirror/dist/emmet.js'),
				np('codemirror/lib/codemirror.js')
			]
		}))
		.pipe(gulp.dest('./out'));
});

gulp.task('default', ['js']);