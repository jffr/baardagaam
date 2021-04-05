// TODO: Group manifest in chunks and entrypoints!
const renderScripts = () => {
  const manifest = require('../../../dist/scripts/manifest.json');
  return `<script src=${manifest['main.js']}></script>`;
};

module.exports = renderScripts;
