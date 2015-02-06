var gulp = require('gulp');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss'],
  dev_templates: ['./www/templates/**/*.html'],
  pub_templates: 'platforms/android/assets/www/templates/',
  dev_www: ['./www/**/*'],
  pub_www: 'platforms/android/assets/www/',
  dev_dist: ['./_dev_era/build/dist/**/*'],
  android_www: {
        scripts: 'platforms/android/assets/www/scripts/',
        styles: 'platforms/android/assets/www/styles/'
    }
};

gulp.task('default', ['sass']);

gulp.task('clean', function(){
    return gulp.src([paths.android_www.scripts, paths.android_www.styles], {read: false})
    .pipe(clean());
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('sync:dist', ['clean'], function(){
  gulp.src(paths.dev_dist)
    .pipe(gulp.dest(paths.pub_www));
});

gulp.task('sync', function(){
  gulp.src(paths.dev_www)
    .pipe(gulp.dest(paths.pub_www));
});
