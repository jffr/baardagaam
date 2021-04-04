const manifest = require('../../../dist/scripts/manifest.json');

// TODO: Group manifest in chunks and entrypoints!
const renderScripts = () => {
  return `<script src=${manifest['main.js']}></script>`;
};

module.exports = renderScripts;
