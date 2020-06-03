var gulp = require("gulp"),
  sass = require("gulp-sass"),
  browse = require("browser-sync").create(),
  autopref = require("gulp-autoprefixer"),
  postcss = require("gulp-postcss"),
  cssmin = require("gulp-cssmin"),
  rename = require("gulp-rename"),
  babel = require("gulp-babel"),
    imagemin = require("gulp-imagemin"),
    cleanCSS = require('gulp-clean-css');
function scssToCss(done) {
    return  gulp.src('./src/scss/style.scss')
        .pipe(sass({
            errorLogToConsole: true
        }))
        .pipe(autopref({
            overrideBrowserslist: ['last 15 versions', '> 1%','ie 11','ie 8', 'ie 7'],
            cascade: false
        }))
        .pipe(cleanCSS())
        /*.pipe(cssmin())*/
        .pipe(rename({suffix: '.min'}))
        .on('error',console.error.bind(console))
        .pipe( gulp.dest('./dist'))
        .pipe(browse.stream());
    done();
}

function babelator(done) {
  gulp
    .src("src/js/script.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(browse.stream());
  done();
}

function browserSync(done) {
  browse.init({
    server: {
      baseDir: "./dist",
    },
  });
  done();
}
function browserReboot(done) {
  browse.reload({ streem: true });
  done();
}
function imageMinification() {
        gulp
            .src('src/images/*')
            .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 20, progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]))
            .pipe(gulp.dest('dist/images'));

};
function sharingan(done) {
  gulp.watch("./src/scss/*", scssToCss);
  gulp.watch("./src/images/", imageMinification());
  gulp.watch("./dist/*.html", browserReboot);
  gulp.watch("./src/js/*", babelator);
  done();
}
gulp.task("default", gulp.parallel(browserSync, sharingan));