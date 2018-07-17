/* eslint-disable no-restricted-syntax */

module.exports = class Schema {
  constructor(obj, app) {
    obj.app = app;
    this.body = obj;
  }

  get app() {
    return this.body.app;
  }

  get revision() {
    return this.body.revision;
  }

  exists(file) {
    return this.body[file.platform][file.type].some(
      item => item.type === 'FILE' && item.file.name === file.name
    );
  }

  async update(files, keys) {
    for (const file of files) {
      console.info(`upload ... ${file.name} (${file.size} bytes)`);
      if (this.exists(file)) {
        // 存在する場合キーとサイズを上書き
        const entry = this.body[file.platform][file.type].find(
          item => item.type === 'FILE' && item.file.name === file.name
        );
        entry.file.fileKey = keys[file.name];
        entry.file.size = file.size;
      } else {
        // 存在しない場合追加
        this.body[file.platform][file.type].push({
          type: 'FILE',
          file: {
            fileKey: keys[file.name],
            name: file.name,
            size: file.size,
          },
        });
      }
    }
  }
};
