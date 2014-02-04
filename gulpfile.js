var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var batch = require('gulp-batch');

gulp.task('tests', function(){
  gulp.src(['test/kss*.js'], {read: false})
    // .pipe(plumber())
    .pipe(mocha({reporter: 'spec', ui: 'tdd'}))
    .on('error', gutil.log);
});


gulp.task('watch', function(){
  gulp.watch(['lib/**', 'test/**', 'bin/**'],
    batch(function(events, cb){
      gulp.start('tests', cb);
    }));
});

gulp.task('default', ['tests', 'watch']);
