//переменные
const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const flatten = require('gulp-flatten');



// ------------------ build -----start

const gulp = require('gulp');
const clean = require('gulp-clean');
const path = require('path');
const htmlreplace = require('gulp-html-replace');
const replace = require('gulp-replace');

//clean folder 'build' before copy
gulp.task('clean', () => {
    return gulp.src('build', { read: false, allowEmpty: true })
        .pipe(clean({ force: true }));
});

// copy folders 'images', 'css', 'js', without folder 'html'
gulp.task('copy', () => {
    return gulp.src(['app/images/**/*', 'app/css/**/*', 'app/js/**/*', '!app/html/**/*'], { base: 'app' })
        .pipe(gulp.dest('build'));
});

// Replace .html in href atributes to ""
gulp.task('html', () => {
    return gulp.src('app/**/*.html')
        .pipe(replace('.html"', '"'))
        .pipe(htmlreplace({
            'removeHtmlExtension': {
                src: '',
                tpl: '<link rel="stylesheet" href="%s.css"><script src="%s.js"></script>'
            }
        }))
        .pipe(gulp.dest('build'));
});

// delete folder 'html' from 'build'
gulp.task('cleanHtmlFromBuild', () => {
    return gulp.src('build/html', { read: false, allowEmpty: true })
        .pipe(clean({ force: true }));
});

gulp.task('build', gulp.series('clean', 'copy', 'html', 'cleanHtmlFromBuild'));
gulp.task('default', gulp.series('build'));

// ------------------ build -----end




function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
        notify: false
    })
}

function styles() {
    return src('app/scss/*.scss')
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(rename({
        suffix: '.min',
    }))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/wow.js/dist/wow.js',
        // 'node_modules/slick-carousel/slick/slick.js',
        'node_modules/mixitup/dist/mixitup.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        // 'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
        // 'node_modules/rateyo/src/jquery.rateyo.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}




function htmlInclude() {
    return src('app/html/pages/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream());
}

function htmlIncludeBlog() {
    return src('app/html/pages/blog/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('app/blog'))
        .pipe(browserSync.stream());
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch('app/html/**/*.html', htmlInclude);
    watch('app/html/**/*.html', htmlIncludeBlog);
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.htmlInclude = htmlInclude;
exports.htmlIncludeBlog = htmlIncludeBlog;

exports.default = parallel(styles, scripts, browsersync, watching, htmlInclude, htmlIncludeBlog);
