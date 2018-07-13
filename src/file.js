const fs = require('fs');
const { promisify } = require('util');
const { basename } = require('path');

exports.loadFile = async (path, encoding = 'utf-8') => {
  const content = await promisify(fs.readFile)(path, encoding);
  const stat = await promisify(fs.stat)(path);
  return {
    content,
    name: basename(path),
    size: stat.size,
  };
};
