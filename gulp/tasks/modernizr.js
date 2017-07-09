var gulp = require('gulp'),
modernizr = require('gulp-modernizr');

//build custom copy of modernizer, goal: smallest possible js file

gulp.task('modernizr', function() {
	return gulp.src(['./app/assets/styles/**/*.css'
		,'./app/assets/scripts/**/*.js'])
	.pipe(modernizr({
		'options': [
			'setClasses'
			]
	}))
	.pipe(gulp.dest('./app/temp/scripts/'));
});