var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var jsBundler = require('js-bundler');
var minifyCSS = require('gulp-minify-css');
var gzip = require('gulp-gzip');
var crc = require('crc');
var htmlTransform = require('html-transform');
var rewriteUrl = htmlTransform.rewriteUrl;
var stringifyDom = htmlTransform.stringifyDom;

var srcOptions = {base: './'};
var outPath = './out';
var production = process.argv.indexOf('--production') !== -1;

function np(file) {
	return path.resolve(path.join('node_modules', file));
}

gulp.task('js', function() {
	return gulp.src('./js/*.js', srcOptions)
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
	return gulp.src('./css/*.css', srcOptions)
		.pipe(minifyCSS({processImport: true}))
		.pipe(gulp.dest(outPath))
});

gulp.task('html', ['static'], function(next) {
	return gulp.src('./out/**/*.html')
		.pipe(rewriteUrl(function(url, file, ctx) {
			if (ctx.stats) {
				url = '/-/' + ctx.stats.hash + url;
			}
			return url;
		}))
		.pipe(stringifyDom('xhtml'))
		.pipe(gulp.dest('./out'));
});

gulp.task('full', ['html'], function() {
	return gulp.src('./out/**/*.{html,css,js,ico}')
		.pipe(gzip({
			threshold: '1kb',
			gzipOptions: {level: 7}
		}))
		.pipe(gulp.dest(outPath));
});

gulp.task('watch', function() {
	jsBundler.watch({sourceMap: true, uglify: false});
	gulp.watch('./css/**/*.css', ['css']);
	gulp.watch('./js/**/*.js', ['js']);
});

gulp.task('static', ['css', 'js']);
gulp.task('default', ['static']);
