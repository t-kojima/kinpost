/* eslint-disable no-console, no-param-reassign */

const axios = require('axios');
const green = text => `\u001b[32m${text}\u001b[0m`;

exports.get = async (auth, app) => {
  const response = await axios({
    method: 'get',
    url: `https://${auth.domain}/k/v1/app/customize.json`,
    headers: {
      'X-Cybozu-Authorization': Buffer.from(
        `${auth.username}:${auth.password}`
      ).toString('base64'),
      'Content-Type': 'application/json',
      Host: `${auth.domain}:443`,
    },
    data: { app },
  });
  return response.data;
};

exports.put = async (auth, body) => {
  body.revision = -1;

  await axios({
    method: 'put',
    url: `https://${auth.domain}/k/v1/preview/app/customize.json`,
    headers: {
      'X-Cybozu-Authorization': Buffer.from(
        `${auth.username}:${auth.password}`
      ).toString('base64'),
      'Content-Type': 'application/json',
      Host: `${auth.domain}:443`,
    },
    data: body,
  });
  console.info(`${green('Upload Successfully.')}`);
};
