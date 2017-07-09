var gulp = require('gulp'), //initialize gulp
svgSprite = require('gulp-svg-sprite'), //generate svg sprite
rename = require('gulp-rename'), //package to rename files through gulp tasks
del = require('del'), //package to delete folders
svg2png = require('gulp-svg2png');

var config = {
	shape: {
		spacing: {
			padding: 1
		}
	},
	mode: {
		css: {
			variables: {
				replaceSvgWithPng: function() {
					return function(sprite, render){
						return render(sprite).split('.svg').join('.png');
					}
				}
			},
			sprite: 'sprite.svg', //remove .css from file name
			render: {
				css: {
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
}

gulp.task ('beginClean', function(){
	return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function(){
	return gulp.src('./app/assets/images/icons/**/*.svg')
	.pipe(svgSprite(config))
	.pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('createPngCopy', ['createSprite'], function(){
	return gulp.src('./app/temp/sprite/css/*.svg')
	.pipe(svg2png())
	.pipe(gulp.dest('./app/temp/sprite/css'));
})

gulp.task('copySpriteGraphic', ['createPngCopy'], function(){
	return gulp.src('./app/temp/sprite/css/**/*.{svg,png}') // package creates auto /css folder
	.pipe(gulp.dest('./app/assets/images/sprites'));
});

//[createSprite] set as dependency for icons task to run in correct order
gulp.task('copySpriteCSS', ['createSprite'], function(){
	return gulp.src('./app/temp/sprite/css/*.css')
	.pipe(rename('_sprite.css'))
	.pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function(){
	return del('./app/temp/sprite');
});
//order of tasks to run

gulp.task('icons', ['beginClean', 'createSprite', 
	'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
