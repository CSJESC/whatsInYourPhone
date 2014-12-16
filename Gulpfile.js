var SERVER_CONNECTION = 'web@materia.localhorst.io';
var SERVER_DEST = '~/project';

// Load Gulp and your plugins
var gulp         = require('gulp');
var path = require('path');

var autoprefixer = require('autoprefixer-stylus');

var $ = require('gulp-load-plugins')();

var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config')[environment];

var port = 3000;
var paths = {
    index: 'app/index.html',
    scripts: 'app/js/**/*',
    styles: 'app/styl/**/*.styl',
    mainStyl: 'app/styl/main.styl',
    dist: 'dist',
    distCSS: '/css',
    distJS: '/js'
};

gulp.task('deploy', function() {
  gulp.src(paths.dist)
    .pipe($.rsync({
        root: paths.dist,
        recursive: true,
        compress: true,
        progress: true,
        hostname: SERVER_CONNECTION,
        destination: SERVER_DEST
    }));
});

// add livereload on the given port
gulp.task('server', function() {
  $.connect.server({
    root: paths.dist,
    port: port,
    livereload: {
      port: 35729
    }
  });
});

gulp.task('open-browser', function () {
	var options = {
		url: "http://localhost:" + port,
		app: "Google Chrome Canary"
	};
    gulp.src(path.join(paths.dist, paths.index))
	.pipe($.open("", options));
});

gulp.task('stylus', function () {
    gulp.src(paths.mainStyl)
    	.pipe($.plumber())
        .pipe($.stylus({
            use: autoprefixer({browsers: ['Firefox > 5%', 'Explorer 9', 'Chrome > 5%', 'Safari > 5%']}), 
            compress: false,
            'include css': true
        }))
        .pipe(gulp.dest(path.join(paths.dist, paths.distCSS)))
        .pipe($.connect.reload());
});

gulp.task('scripts', function () {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpack(webpackConfig))
    .pipe(isProduction ? $.uglifyjs() : $.util.noop())
    .pipe(gulp.dest(path.join(paths.dist, paths.distJS)))
    .pipe($.connect.reload());
});

// copy html from app to dist
gulp.task('html', function() {
  return gulp.src(path.resolve(paths.index))
    .pipe(gulp.dest(paths.dist))
    .pipe($.connect.reload());
});


// Watch task
gulp.task('watch', function () {
    // gulp.watch(paths.index, ['html']);
    // gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['stylus']);
});

//default task
gulp.task('default', ['server','html', 'stylus','scripts','watch']);

gulp.task('open', ['server','open-browser','watch']);
gulp.task('produce', ['html', 'stylus','scripts']);