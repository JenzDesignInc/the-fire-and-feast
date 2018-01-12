// https://css-tricks.com/gulp-for-beginners/

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify'); //minify js
var gulpIf = require('gulp-if'); //minify js
var cssnano = require('gulp-cssnano'); //minify css
var imagemin = require('gulp-imagemin'); //minify imgs
var cache = require('gulp-cache'); //cache optimization of imgs
var del = require('del'); //delete unused files from 'dist'
var runSequence = require('run-sequence'); //ensure tasks run in order


gulp.task('default', function (callback) {
    runSequence(['sass','browserSync', 'watch'],
      callback
    )
  })




gulp.task('sass', function(){
    return gulp.src('app/assets/styles/app.scss')
      .pipe(sass()) // Using gulp-sass
      
      .pipe(gulp.dest('app/assets/styles'))
      .pipe(browserSync.reload({
        stream: true
      }))

    // For production
    // .pipe(gulp.dest('app/assets/styles' && 'dist'))
  });

  gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'app'
      },
    })
  })

  gulp.task('build', function (callback) {
    runSequence('clean:dist', 
      ['sass', 'useref', 'images'],
      // If using font directory
      // ['sass', 'useref', 'images', 'fonts'],
      callback
    )
  })


  gulp.task('useref', function(){
    return gulp.src('app/*.html')
      .pipe(useref())
      // Minifies only if it's a JavaScript file
      .pipe(gulpIf('*.js', uglify()))
      .pipe(gulpIf('*.css', cssnano()))
      .pipe(gulp.dest('dist'))
  });

  gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
   // Caching images that ran through imagemin
    .pipe(cache(imagemin({
    interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
  });

//To clear the caches off your local system, you can create a separate task that's named `cache:clear`
//   gulp.task('cache:clear', function (callback) {
//     return cache.clearAll(callback)
//     })


// If font directory is added in assets
//   gulp.task('fonts', function() {
//     return gulp.src('app/fonts/**/*')
//     .pipe(gulp.dest('dist/fonts'))
//   })

gulp.task('clean:dist', function() {
    return del.sync('dist');
  })


  gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('app/assets/**/*.scss', ['sass']); 
    gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/assets/scripts/**/*.js', browserSync.reload); 
  });