const customize = require('./api/customize');
const fileapi = require('./api/file');
const { loadFile } = require('./file');

const green = text => `\u001b[32m${text}\u001b[0m`;
const red = text => `\u001b[31m${text}\u001b[0m`;

/**
 * カスタムJavaScriptファイルをアップロードする
 * @param param.domain kintoneサブドメイン
 * @param param.app 対象アプリID
 * @param param.username ユーザー名
 * @param param.password パスワード
 * @param param.file.path ファイルパス
 * @param param.file.encoding エンコード(default: utf-8)
 * @param param.file.type js or css(default: js)
 * @param param.platform desktop or mobile(default: desktop)
 */
module.exports = async params => {
  try {
    const auth = {
      domain: params.domain,
      username: params.username,
      password: params.password
    };

    const file = await loadFile(params.file.path, params.file.encoding);
    const fileKey = await fileapi.upload(auth, file);
    const schema = await customize.get(auth, params.app);
    // TODO remove FILE
    schema.desktop.js.push({
      type: 'FILE',
      file: {
        fileKey,
        name: file.name,
        size: file.size
      }
    });
    schema.app = params.app;
    schema.revision = -1;
    await customize.put(auth, schema);
    console.info(green('File Upload Successfully.'));
  } catch (e) {
    console.error(
      red(`Error: ${e.response.statusText} [${e.response.status}]`)
    );
    console.error(e.response.data);
  }
};
