var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var jsBundler = require('js-bundler');
var minifyCSS = require('gulp-minify-css');
var gzip = require('gulp-gzip');
var crc = require('crc');
var htmlImporter = require('html-importer')
var urlProcessor = require('html-importer/lib/rewrite-url');

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

gulp.task('html', function(next) {
	var hashLookup = {};
	var getFileHash = function(file) {
		if (!hashLookup[file]) {
			hashLookup[file] = crc.crc32(fs.readFileSync(file));
		}

		return hashLookup[file];
	}

	htmlImporter({processXslt: false})
	.use(urlProcessor({
		cwd: path.resolve('./out'),
		transform: function(url, info) {
			if (info.actual) { // file exists
				try {
					var stat = fs.statSync(info.actual);
					if (stat.isFile()) {
						url = '/-/' + getFileHash(info.actual) + url;
					}
				} catch (e) {}
			}
			return url;
		}
	}))
	.run('./out/**/*.html', function(err, files) {
		if (!err) {
			files.forEach(function(file) {
				file.save('./');
			});
		}
		next(err);
	});
});

gulp.task('full', ['html'], function() {
	return gulp.src('./out/**/*.{html,css,js}')
		.pipe(gzip({
			threshold: '1kb',
			gzipOptions: {level: 7}
		}))
		.pipe(gulp.dest(outPath));
});

gulp.task('static', ['css', 'js']);
gulp.task('default', ['static']);
