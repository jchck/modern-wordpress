// Define plugin to load in our gulpfile
var gulp			= require('gulp');
var postcss			= require('gulp-postcss');
var cssnext			= require('postcss-cssnext');
var atImport		= require('postcss-import');
var mqpacker		= require('css-mqpacker');
var cssnano			= require('cssnano');
var size			= require('gulp-size');
var cssvariables	= require('postcss-css-variables');
var watch			= require('gulp-watch');
var browserSync		= require('browser-sync').create();
var browserReload	= browserSync.reload;

var devURL			= 'http://vagrant.local/wppostcss/'



// The complete CSS processing task
gulp.task('css', function(){

	// Define Postcss plugins which we'll pass below
	var postcssPlugins = [
		atImport,
		cssnext({
			'browsers' : ['last 2 versions']
		}),
		cssvariables,
		cssnano({
			'autoprefixer' : false
		}),
		mqpacker,
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
		.pipe(gulp.dest('./dest'))

		.pipe(browserSync.stream());
});

// The gulp watch task
gulp.task('watch', function(){
	browserSync.init({
		files: ['{lib}/**/*.php', '*.php'],
		proxy: devURL,
		snippetOptions: {
			whitelist: ['/wp-admin/admin-ajax.php'],
			blacklist: ['/wp-admin/**']
		}
	});

	gulp.watch('./src/css/*.css', ['css']).on('change', browserSync.reload);
	gulp.watch('**.php').on('change', browserSync.reload);
});