const axios = require('axios');

module.exports = async (auth, app, revision) => {
  const body = {
    apps: [
      {
        app,
        revision,
      },
    ],
  };
  await axios({
    method: 'post',
    url: `https://${auth.domain}/k/v1/preview/app/deploy.json`,
    headers: {
      'X-Cybozu-Authorization': Buffer.from(
        `${auth.username}:${auth.password}`
      ).toString('base64'),
      'Content-Type': 'application/json',
      Host: `${auth.domain}:443`,
    },
    data: body,
  });
};
