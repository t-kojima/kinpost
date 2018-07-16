/* eslint-disable no-restricted-syntax */

const R = require('ramda');
const { basename } = require('path');

function* filenames(schema) {
  const items = R.xprod(['desktop', 'mobile'], ['js', 'css']).map(
    a => schema[a[0]][a[1]]
  );
  const files = []
    .concat(...items)
    .filter(item => item && item.type === 'FILE');
  yield* files.map(file => file.file.name);
}

exports.exists = (schema, path) => {
  for (const filename of [...filenames(schema)]) {
    if (basename(path) === filename) {
      return true;
    }
  }
  return false;
};
