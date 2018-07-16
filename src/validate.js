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

module.exports = (params, schema) => {
  if (!params.overwrite) {
    for (const filename of [...filenames(schema)]) {
      if (params.files.some(file => basename(file.path) === filename)) {
        throw Error(`Already exists ${filename}`);
      }
    }
  }
  return true;
};
