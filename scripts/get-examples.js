const path = require('path');
const { readdirSync } = require('fs');

const exclude = [
  'imports', // imported files
  'mson', // consist only of Data Structures, rendered page will be empty
];

/**
 * Get a list of APIB files in `examples` directory and subdirectories
 * @param {string} entryDir - current directory where we're looking for files
 * @param {string=} rootDir - source directory (/examples)
 * @return {Array<string>}
 */
function getExamplesFromDir(entryDir, rootDir) {
  if (!rootDir) {
    rootDir = entryDir;
  }

  const files = readdirSync(entryDir, { encoding: 'utf8', withFileTypes: true }).reduce((acc, dirent) => {
    const name = dirent.name;

    if (exclude.includes(name)) {
      return acc;
    }

    if (dirent.isDirectory()) {
      const subDir = path.join(entryDir, name);
      const nextFiles = getExamplesFromDir(subDir, rootDir);
      return acc.concat(nextFiles);
    }

    if (dirent.isFile()) {
      const dirDiff = path.relative(rootDir, entryDir);
      const fileName = dirDiff ? `${dirDiff}/${name}` : name;
      return acc.concat([fileName]);
    }

    return acc;
  }, []);

  return files;
}

module.exports = getExamplesFromDir;
