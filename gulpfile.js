const { src, dest, series, parallel } = require("gulp");
const del = require("del");
const sass = require("gulp-sass");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackDevConfig = require("./webpack.dev.js");
const webpackProdConfig = require("./webpack.prod.js");

/*
  TODO:
  - Production and development builds
  - Display detailed Webpack errors
  - Clean task
  - Webpack (JS + TS) task
  - Dev server
  - SASS
  - Template engine (such as hbs)
  - Hot module reloading
  - Publish task
  - Watch task
  - Autoprefixes researching
  - Fonts
  - Images
  - SVG store (icon spritesheet)
*/

const isProdMode = process.env.NODE_ENV === 'production';

const paths = {
  styles: {
    src: "src/styles/main.scss",
    dest: "dist/styles/",
  },
  scripts: {
    src: "src/scripts/main.ts",
    dest: "dist/scripts/",
  },
};

function clean() {
  return del(["dist"]);
}

function scripts() {
  return src(paths.scripts.src)
    .pipe(webpackStream(isProdMode ? webpackProdConfig : webpackDevConfig, webpack))
    .pipe(dest(paths.scripts.dest));
}

function styles() {
  return src(paths.styles.src)
    .pipe(sass())
    .pipe(dest(paths.styles.dest));
}

exports.default = series(clean, styles, scripts);
exports.build = series(clean, styles, scripts);
