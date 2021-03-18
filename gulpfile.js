const { src, dest, series, parallel } = require('gulp');
const del = require('del');
const sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const nunjucks = require('gulp-nunjucks');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackDevConfig = require('./webpack.dev.js');
const webpackProdConfig = require('./webpack.prod.js');
const templateData = require('./src/data');

/*
  TODO:
  - Production and development builds
  - Display detailed Webpack errors
  - Clean task
  - Webpack (JS + TS) task
  - Babel support with default setting
  - Dev server
  - SASS
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
    src: 'src/styles/main.scss',
    dest: 'dist/styles/',
  },
  scripts: {
    src: 'src/scripts/main.ts',
    dest: 'dist/scripts/',
  },
  templates: {
    src: 'src/templates/index.njk',
    dest: 'dist/templates/',
  },
};

function clean() {
  return del(['dist']);
}

function scripts() {
  const config = isProdMode ? webpackProdConfig : webpackDevConfig;

  return src(paths.scripts.src)
    .pipe(webpackStream(config, webpack))
    .pipe(dest(paths.scripts.dest));
}

function styles() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass())
    .pipe(sourcemaps.write('.', { addComment: false }))
    .pipe(dest(paths.styles.dest));
}

function templates() {
  return src(paths.templates.src)
    .pipe(nunjucks.compile(templateData))
    .pipe(dest(paths.templates.dest));
}

exports.default = series(clean, templates, styles, scripts);
exports.build = series(clean, templates, styles, scripts);
