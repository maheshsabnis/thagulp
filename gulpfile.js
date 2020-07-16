// load all packages required for tasks
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

// functions as Gulp Task modules (gulp v 4.0+)
function style() {
    // 1. locate all scss files
    return gulp.src('./scss/**/*.scss')
        // 2. pass all these files to sass compiler
        .pipe(sass())
        // 3. save file in target location
        .pipe(gulp.dest('./css'))
        // 4 stream all scss to css changes to browser
        .pipe(browserSync.stream())
}

function watch() {
    // 1. define the host / root directory that will start server
    // and repond all resources
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    // 2. watch all changes in .scss and .html files and deliver
    gulp.watch('./scss/**/*.scss', style);
    // 3. monitor changes in html file and reload browser with changes
    gulp.watch('./*.html').on('change', browserSync.reload);
    // 4. send the compiled modified scss files to browser
    gulp.watch('./scss/**/*.scss', browserSync.reload);
}
exports.style = style;
exports.watch = watch;