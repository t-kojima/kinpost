/* eslint-disable no-await-in-loop, no-restricted-syntax */

const customize = require('./api/customize');
const fileApi = require('./api/file');
const deployApi = require('./api/deploy');
const Schema = require('./schema');
const File = require('./file');
const { validate } = require('./utils');

const green = text => `\u001b[32m${text}\u001b[0m`;
const red = text => `\u001b[31m${text}\u001b[0m`;

/**
 * Get Customize Schema
 *
 * @param {Object} auth kintone auth parameters
 * @param {number} app target kintone app id
 * @returns {Schema} customize data
 */
const getSchema = async (auth, app) => {
  const schema = await customize.get(auth, app);
  return new Schema(schema, app);
};

/**
 * Put Edited Customize Schema
 *
 * @param {Object} auth kintone auth parameters
 * @param {Schema} schema edited customize data
 */
const putSchema = async (auth, schema) => {
  await customize.put(auth, schema.body);
};

/**
 * Edit Cuctomize Schema using local files
 *
 * @param {Object} auth kintone auth parameters
 * @param {Schema} schema customize data
 * @param {Array.Object} fileParams file config list
 */
const updateSchema = async (auth, schema, fileParams) => {
  const getFileKeys = async files => {
    const obj = {};
    for (const file of files) {
      obj[file.name] = await fileApi.upload(auth, file.content, file.name);
    }
    return obj;
  };

  const files = fileParams.map(p => new File(p));
  const keys = await getFileKeys(files);
  schema.update(files, keys);
};

/**
 * Custom JavaScript file upload to kintone.
 *
 * @param {string} param.domain kintone sub domain
 * @param {number} param.app target kintone app id
 * @param {string} param.username kintone login username
 * @param {string} param.password kintone login password
 * @param {Array.Object} param.files file config list
 * @param {boolean} param.deploy Deploy to Production Environment
 */
module.exports = async ({
  domain,
  app,
  username,
  password,
  files,
  deploy = false,
}) => {
  try {
    validate({ domain, app, username, password, files });

    const auth = { domain, username, password };
    const schema = await getSchema(auth, app);
    await updateSchema(auth, schema, files);
    await putSchema(auth, schema);
    if (deploy) {
      await deployApi(auth, schema.app, Number(schema.revision) + 1);
    }

    console.info(
      green(
        `File Upload to ${
          deploy ? 'Production' : 'Testing'
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
