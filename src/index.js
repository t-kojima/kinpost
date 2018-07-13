const customize = require('./api/customize');
const fileapi = require('./api/file');
const { loadFile } = require('./file');

/**
 * カスタムJavaScriptファイルをアップロードする
 * @param param.domain kintoneサブドメイン
 * @param param.app 対象アプリID
 * @param param.auth.username ユーザー名
 * @param param.auth.password パスワード
 * @param param.file.path ファイルパス
 * @param param.file.encoding エンコード(default: utf-8)
 * @param param.file.type js or css(default: js)
 * @param param.platform desktop or mobile(default: desktop)
 */
module.exports = async params => {
  const auth = {
    domain: params.domain,
    username: params.auth.username,
    password: params.auth.password,
  };

  const file = await loadFile(params.file.path, params.file.encoding);
  console.log(file);
  const fileKey = await fileapi.upload(auth, file);
  console.log(fileKey);
  const schema = await customize.get(auth, params.app);
  schema.desktop.js.push({
    type: 'FILE',
    file: {
      fileKey,
      // contentType: 'application/javascript',
      name: file.name,
      size: file.size, // .toString(),
    },
  });
  schema.app = params.app;
  schema.revision = -1;
  console.dir(schema, { depth: null });
  await customize.put(auth, schema);
};
