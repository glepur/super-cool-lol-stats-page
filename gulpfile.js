var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');

gulp.task('build:jsx', function() {
  browserify({
    entries: './client/app/app.jsx',
    debug: true,
    extensions: ['.js', '.jsx'],
    paths: ['./client/app/']
  })
    .transform(babelify, {
      presets: ['es2015', 'react'],
      plugins: ['transform-runtime', 'transform-async-to-generator']
    })
    .bundle()
    .on('error', swallowError)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./client'));
});

gulp.task('build', ['build:jsx']);

gulp.task('watch', function() {
  gulp.watch(
    ['./client/**/*.js', './client/**/*.jsx', '!./client/main.js'],
    ['build:jsx']
  );
});

gulp.task('default', ['build', 'watch']);

function swallowError(error) {
  console.log(error.toString());

  this.emit('end');
}
