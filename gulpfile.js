const {src, dest, parallel} = require('gulp');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");

function mapfile_image() {
    return src("agents/**/*.png")
        .pipe(imagemin())
        .pipe(dest("build/agents"));
};

function mapfile() {
    return src(["agents/**/*", "!agents/**/*.png", "!agents/**/*.js"])
        .pipe(dest("build/agents"));
};

function agents() {
    return src("agents/**/*.js")
        .pipe(uglify())
        .pipe(dest("build/agents"));
};

function css() {
    return src("src/clippy.css")
        .pipe(dest("build"))
        .pipe(minifyCSS())
        .pipe(dest("build"))
        .pipe(rename("clippy.min.css"))
        .pipe(dest("build"))
};

function js() {
    return src("src/**/*.js")
        .pipe(concat("clippy.js"))
        .pipe(dest("build"))
        .pipe(uglify())
        .pipe(rename("clippy.min.js"))
        .pipe(dest("build"));
};

exports.mapfile_image = mapfile_image;
exports.mapfile = mapfile;
exports.agents = agents;
exports.css = css;
exports.js = js;

exports.default = parallel(mapfile_image,mapfile, agents, css, js);