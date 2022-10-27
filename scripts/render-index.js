const pug = require('pug');
const path = require('path');

const PATH_PREFIX = 'https://github.com/funbox/api-blueprint-tutorial/tree/master/examples';
const EXAMPLE_PREFIX = process.env.BASE_PATH || '';

const baseDir = path.resolve(__dirname, '../');
const indexFile = path.join(baseDir, 'src/index.pug');

function renderIndexFile(examples) {
  const extendedExamples = examples.map(exmp => ({
    name: exmp,
    to: `${EXAMPLE_PREFIX}/examples/${exmp.replace(/(.+)\.apib/, '$1.html')}`,
    source: `${PATH_PREFIX}/${exmp}`,
  }));

  return pug.renderFile(indexFile, { examples: extendedExamples });
}

module.exports = renderIndexFile;
