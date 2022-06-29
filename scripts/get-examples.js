const path = require('path');
const { readdirSync } = require('fs');

const exclude = [
  'imports', // подключаемые файлы
  'mson', // содержат только Data Structures, рендер будет пустой
];

/**
 * Получаем список apib-файлов, находящихся в директории examples и её поддиректориях
 * @param {string} entryDir - текущая директория, в которой ищем файлы
 * @param {string=} rootDir - исходная директория (examples)
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
