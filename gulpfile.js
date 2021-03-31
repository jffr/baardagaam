const browserSync = require('browser-sync');
const del = require('del');
const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-dart-sass');
const nunjucks = require('gulp-nunjucks');
const prettier = require('gulp-prettier');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const data = require('./src/data');
const webpackDevConfig = require('./webpack.dev.js');
const webpackProdConfig = require('./webpack.prod.js');

const devServer = browserSync.create();
const isProdMode = process.env.NODE_ENV === 'production';

const paths = {
  styles: {
    entry: 'src/styles/main.scss',
    dest: 'dist/styles/',
    files: 'src/styles/**/*.scss',
  },
  scripts: {
    entry: 'src/scripts/main.ts',
    dest: 'dist/scripts/',
    files: 'src/scripts/**/*.ts',
  },
  templates: {
    entry: 'src/templates/index.njk',
    dest: 'dist/',
    files: 'src/templates/**/*.njk',
  },
};

function clean() {
  return del(['dist']);
}

function scripts() {
  const config = isProdMode ? webpackProdConfig : webpackDevConfig;

  return src(paths.scripts.entry)
    .pipe(webpackStream(config, webpack))
    .pipe(dest(paths.scripts.dest));
}

function styles() {
  return src(paths.styles.entry)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass())
    .pipe(sourcemaps.write('.', { addComment: false }))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function templates() {
  const manifest = require('./dist/scripts/manifest.json');

  return src(paths.templates.entry)
    .pipe(nunjucks.compile({
      ...data,
      manifest
    }))
    .pipe(dest(paths.templates.dest));
}

function formatter() {
  return src([paths.scripts.files, paths.styles.files])
    .pipe(prettier())
    .pipe(dest((file) => file.base));
}

function serve() {
  devServer.init({
    server: {
      baseDir: "./dist"
    }
  })

  watch(paths.styles.files, styles);
  watch(paths.scripts.files, scripts);
  watch(paths.templates.files, templates).on('change', devServer.reload);
}

exports.default = series(clean, scripts, templates, styles, serve);
exports.build = series(clean, formatter, scripts, templates, styles);
