const fs = require('fs');
const { basename } = require('path');

module.exports = class File {
  constructor(params) {
    const encoding = params.encoding || 'utf-8';
    this.path = params.path;
    this.content = fs.readFileSync(params.path, { encoding });
    this.name = basename(params.path);
    this.size = fs.statSync(params.path).size;
    this.platform = params.platform || 'desktop';
    this.type = params.type || 'js';
  }
};
