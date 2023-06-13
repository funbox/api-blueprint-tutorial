const childProcess = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const renderIndexFile = require('./render-index');
const getExamplesFromDir = require('./get-examples');

const ANSI_RED = '\x1b[31m';
const ANSI_ALL_OFF = '\x1b[0m';

const baseDir = path.resolve(__dirname, '../');
const publicDir = path.join(baseDir, 'public');
const examplesDir = path.join(baseDir, 'examples');

build();

async function build() {
  try {
    await runCommand('rm -rf public');
    await runCommand('mkdir public');
    await runCommand('cd public && mkdir examples');
    await runCommand('cp -R src/assets/. public');

    const examples = getExamplesFromDir(examplesDir);
    const indexFileContent = renderIndexFile(examples);
    fs.writeFileSync(path.join(publicDir, 'index.html'), indexFileContent);
    await createExamples(examples);
  } catch (err) {
    process.exit(1);
  }
}

function createExamples(examples) {
  const promises = examples.map(example => {
    const fileName = example.replace(/(.+)\.apib/, '$1.html');
    const cmd = `node node_modules/@funboxteam/blueprinter/bin/index.js -i examples/${example} -o public/examples/${fileName}`;
    return runCommand(cmd);
  });

  return Promise.all(promises);
}

function runCommand(cmd) {
  return new Promise((resolve, reject) => {
    const res = childProcess.exec(cmd);

    res.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    res.stderr.on('data', (data) => {
      console.error(data.toString());
    });
    res.on('exit', (code, signal) => {
      if (signal || code !== 0) {
        console.error(`${ANSI_RED}[ERROR] Command ${cmd} failed with an error${ANSI_ALL_OFF}`);
        reject();
      } else {
        resolve();
      }
    });
  });
}
