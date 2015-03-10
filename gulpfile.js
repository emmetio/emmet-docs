var path = require('path');
var gulp = require('gulp');
var jsBundler = require('js-bundler');
var minifyCSS = require('gulp-minify-css');
var gzip = require('gulp-gzip');

var srcOptions = {base: './src/files'};
var outPath = './out';

function np(file) {
	return path.resolve(path.join('node_modules', file));
}

gulp.task('js', function() {
	var production = process.argv.indexOf('--production') !== -1;
	return gulp.src('./src/files/js/*.js', srcOptions)
		.pipe(jsBundler({
			uglify: production,
			sourceMap: !production,
			noParse: [
				np('codemirror-movie/dist/movie.js'), 
				np('emmet-codemirror/dist/emmet.js'),
				np('codemirror/lib/codemirror.js')
			]
		}))
		.pipe(gulp.dest(outPath));
});

gulp.task('css', function() {
	return gulp.src('./src/files/css/*.css', srcOptions)
		.pipe(minifyCSS({processImport: true}))
		.pipe(gulp.dest(outPath))
});

gulp.task('full', ['default'], function() {
	return gulp.src('./out/**/*.{html,css,js}')
		.pipe(gzip({
			threshold: '1kb',
			gzipOptions: {level: 7}
		}))
		.pipe(gulp.dest(outPath));
});

gulp.task('default', ['js', 'css']);
