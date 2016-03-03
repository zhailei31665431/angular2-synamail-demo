var gulp = require('gulp');
var ts = require('gulp-typescript');
var uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

gulp.task('typescript',function(){
	gulp.src('app/before/**/*.ts')
  	.pipe(ts({
	  	target: "es5",
	    module: "system",
	    moduleResolution: "node",
	    emitDecoratorMetadata: true,
	    experimentalDecorators: true,
	    removeComments: false,
	    noImplicitAny: false
	  	}))
  	.pipe(gulp.dest('app/after'))
})

var tsProject = ts.createProject('tsconfig.json');
gulp.task('typescript1',function(){
  var tsResult = tsProject.src('app/before/**/*.ts')
        .pipe(ts(tsProject));
  return tsResult.js.pipe(gulp.dest('app/after'));
})

gulp.task('minifycss',function(){
    gulp.src(['css/**/*.scss'])
        .pipe(sass())
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles'))
})

gulp.task('watch:css',function(){
    gulp.watch(['css/**/*.scss'],['minifycss'])
})


gulp.task('contat:css',function(){
    return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.css','bower_components/bootstrap3-dialog/dist/css/bootstrap-dialog.css','bower_components/font-awesome/css/font-awesome.css','bower_components/nprogress/nprogress.css','bower_components/sweetalert/dist/sweetalert.css'])
        .pipe(sass())
        .pipe(minifycss())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/styles'));
})
gulp.task('contat:js',function(){
    return gulp.src(['bower_components/jquery/dist/jquery.js','bower_components/bootstrap/dist/js/bootstrap.js','bower_components/bootstrap3-dialog/dist/js/bootstrap-dialog.js','bower_components/nprogress/nprogress.js','bower_components/sweetalert/dist/sweetalert.min.js','bower_components/underscore/underscore.js','node_modules/es6-shim/es6-shim.min.js','node_modules/systemjs/dist/system-polyfills.js','node_modules/angular2/bundles/angular2-polyfills.js','node_modules/systemjs/dist/system.src.js','node_modules/rxjs/bundles/Rx.js','node_modules/angular2/bundles/angular2.dev.js','node_modules/angular2/bundles/http.js'])
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/scripts'));
})

gulp.task('serve',function(){
  browserSync({
    notify: false,
    server: {
      baseDir: ['.','/'],
      routes:{
        "/bower_components":"bower_components",
      },
    }
  });
  gulp.watch(['app/before/**/*.ts'],['typescript']);
    gulp.watch(['css/**/*.scss'],['minifycss'])
});
