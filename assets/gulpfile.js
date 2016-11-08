(function (process, require) {
	var gulp, fs, uglify, concat, less, rename, minifyCss, task;

	if (typeof process === "undefined" || typeof require === "undefined") {
		throw "The whole thing went up in flames";
	}

	/**
	 * Require necessary tools
	 */
	gulp = require('gulp');
	fs = require('fs');
	uglify = require('gulp-uglifyjs');
	concat = require('gulp-concat');
	less = require('gulp-less');
	rename = require('gulp-rename');
	minifyCss = require('gulp-minify-css');

	/**
	 * Get the task name
	 */
	task = (process.argv[2] || null);

	/**
	 * Gulp concat javascript
	 */
	gulp.task('contact', function() {
		return gulp.src(['scripts/libs/**/*.js', 'scripts/app/**/*.js', 'scripts/app.js'])
	    	.pipe(concat('app.min.js'))
			.pipe(gulp.dest('dist'));
	});

	/**
	 * Gulp uglify javascript
	 */
	gulp.task('uglify', function() {
		return gulp.src(['scripts/libs/**/*.js', 'scripts/app/**/*.js', 'scripts/app.js'])
			.pipe(uglify('app.min.js'))
			.pipe(gulp.dest('dist'));
	});

	/**
	 * Gulp Less task for building the app css files
	 * Function converts less to minified css
	 */
	gulp.task('less', function() {
		return gulp.src(['less/main.less'])
			.pipe(less())
			.pipe(minifyCss())
			.pipe(rename('app.min.css'))
			.pipe(gulp.dest('dist'));
	});

	/**
	 * Set .htaccess version
	 */
	gulp.task('version', function(callback) {
		var date = new Date(),
			expires = new Date();

		expires.setMonth(date.getMonth() + 11)

		var	content =
				'AddType application/octet-stream .pdf\n\n' +
				'<IfModule mod_headers.c>\n' +
					'\t<FilesMatch "\\.(bmp|css|flv|gif|ico|jpg|jpeg|js|pdf|png|svg|swf|tif|tiff|woff)$">\n' +
						'\t\tHeader unset ETag\n' +
						'\t\tHeader set Last-Modified "' + date.toUTCString() + '"\n' +
						'\t\tHeader set Cache-Control "public, max-age=31536000"\n' +
						'\t\tHeader set Expires "' + expires.toUTCString() + '"\n' +
					'\t</FilesMatch>\n' +
				'</IfModule>\n' +
				'FileETag None\n';

	  return fs.writeFile('.htaccess', content, callback);
	});

	/**
	 * Track changes and update dev scripts
	 */
	gulp.task('live', function() {
		gulp.watch('less/**/*.less', ['less']);
		gulp.watch('scripts/**/*.js', ['contact']);
	});

	/**
	 * Register default gulp tasks
	 */
	gulp.task('build', ['uglify', 'less', 'version']);
	gulp.task('default', ['build']);

	/**
	 * If the process argument is not a registered gulp task, throw exception to terminate the process
	 */
	if (task && !gulp.hasTask(task)) {
		throw "Gulp task '" + task + "' not registered";
	}

})(process, require);