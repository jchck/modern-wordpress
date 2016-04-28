// Define plugin to load in our gulpfile
var gulp			= require('gulp');
var postcss			= require('gulp-postcss');
var cssnext			= require('postcss-cssnext');
var precss			= require('precss');
var autoprefixer	= require('autoprefixer');
var atImport		= require('postcss-import');
var mqpacker		= require('css-mqpacker');
var cssnano			= require('cssnano');
var size			= require('gulp-size');
var cssvariables	= require('postcss-css-variables');


// The complete CSS processing task
gulp.task('css', function(){

	// Define Postcss plugins which we'll pass below
	var postcssPlugins = [
		atImport,
		cssvariables,
		cssnano,
		autoprefixer({
			browsers: ['last 2 versions']
		}),
		cssnext,
		mqpacker,
		precss
	];

	// Steps making up the CSS task
	// First identify the source
	return gulp.src('./src/css/styles.css')

		// Then pass in Postcss plugins
		.pipe(postcss(postcssPlugins))

		// Then print the size of the stylesheet to the console
		.pipe(size({gzip: false, showFiles: true, title: 'Processed!'}))
		.pipe(size({gzip: true, showFiles: true, title: 'Processed & gZipped!'}))
		
		// Then define where to deliver the end result
		.pipe(gulp.dest('./dest'));
});