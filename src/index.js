/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax, no-param-reassign */

const customize = require('./api/customize');
const fileApi = require('./api/file');
const deploy = require('./api/deploy');
const validate = require('./validate');
const { loadFile } = require('./file');

const green = text => `\u001b[32m${text}\u001b[0m`;
const red = text => `\u001b[31m${text}\u001b[0m`;

/**
 * カスタムJavaScriptファイルをアップロードする
 * @param {string} param.domain kintoneサブドメイン
 * @param {number} param.app 対象アプリID
 * @param {string} param.username ユーザー名
 * @param {string} param.password パスワード
 * @param {Array.Object} param.files ファイル情報
 * @param {string} [param.platform=desktop] desktop or mobile
 * @param {boolean} [param.overwrite=false] 上書き有無
 */
module.exports = async params => {
  try {
    const auth = {
      domain: params.domain,
      username: params.username,
      password: params.password,
    };
    params.overwrite = params.overwrite || false;

    const schema = await customize.get(auth, params.app);
    validate(params, schema);

    for (const fileParam of params.files) {
      const fileObj = await loadFile(fileParam.path, fileParam.encoding);
      const fileKey = await fileApi.upload(auth, fileObj);
      // TODO remove FILE
      schema.desktop.js.push({
        type: 'FILE',
        file: {
          fileKey,
          name: fileObj.name,
          size: fileObj.size,
        },
      });
      schema.app = params.app;
      await customize.put(auth, schema);
    }
    await deploy(auth, params.app, schema.revision);
    console.info(green('File Upload Successfully.'));
  } catch (e) {
    if (e.response) {
      console.error(
        red(`Error: ${e.response.statusText} [${e.response.status}]`)
      );
      console.error(e.response.data);
    } else {
      console.error(red(`Error: ${e.message}`));
    }
  }
};
