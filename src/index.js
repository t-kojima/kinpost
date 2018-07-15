/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const customize = require('./api/customize');
const fileApi = require('./api/file');
const { loadFile } = require('./file');

const green = text => `\u001b[32m${text}\u001b[0m`;
const red = text => `\u001b[31m${text}\u001b[0m`;

const validate = (schema, params) => {
  function* filenames() {
    const items = R.xprod(['desktop', 'mobile'], ['js', 'css']).map(
      a => schema[a[0]][a[1]]
    );
    const files = [].concat(...items).filter(item => item.type === 'FILE');
    yield* files.map(file => file.file.name);
  }

  if (
    !params.overwrite &&
    [...filenames()].some(name =>
      params.files.some(file => basename(file.name === name))
    )
  ) {
    throw Error();
  }
};

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

    const schema = await customize.get(auth, params.app);

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
    // const file = await loadFile(params.file.path, params.file.encoding);
    // const fileKey = await fileApi.upload(auth, file);
    // const schema = await customize.get(auth, params.app);
    // // TODO remove FILE
    // schema.desktop.js.push({
    //   type: 'FILE',
    //   file: {
    //     fileKey,
    //     name: file.name,
    //     size: file.size,
    //   },
    // });
    // schema.app = params.app;
    // schema.revision = -1;
    // await customize.put(auth, schema);
    console.info(green('File Upload Successfully.'));
  } catch (e) {
    console.error(
      red(`Error: ${e.response.statusText} [${e.response.status}]`)
    );
    console.error(e.response.data);
  }
};
