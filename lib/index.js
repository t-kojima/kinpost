/* eslint-disable no-await-in-loop, no-restricted-syntax */

const customize = require('./api/customize');
const fileApi = require('./api/file');
const deploy = require('./api/deploy');
const Schema = require('./schema');
const File = require('./file');
const { validate } = require('./utils');

const green = text => `\u001b[32m${text}\u001b[0m`;
const red = text => `\u001b[31m${text}\u001b[0m`;

const getSchema = async (auth, app) => {
  const schema = await customize.get(auth, app);
  return new Schema(schema, app);
};

const getFiles = files => files.map(param => new File(param));

const getFileKeys = async (auth, files) => {
  const obj = {};
  for (const file of files) {
    obj[file.name] = await fileApi.upload(auth, file.content, file.name);
  }
  return obj;
};

/**
 * Custom JavaScript file upload to kintone.
 *
 * @param {string} param.domain kintone sub domain
 * @param {number} param.app target kintone app id
 * @param {string} param.username kintone login username
 * @param {string} param.password kintone login password
 * @param {Array.Object} param.files file infomations
 */
module.exports = async params => {
  try {
    validate(params);

    const auth = {
      domain: params.domain,
      username: params.username,
      password: params.password,
    };

    const schema = await getSchema(auth, params.app);
    const files = getFiles(params.files);
    const keys = await getFileKeys(auth, files);
    schema.update(files, keys);

    await customize.put(auth, schema.body);
    if (params.deploy) {
      await deploy(auth, schema.app, Number(schema.revision) + 1);
    }
    console.info(
      green(
        `File Upload to ${
          params.deploy ? 'Production' : 'Testing'
        } Environment Successfully.`
      )
    );
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
