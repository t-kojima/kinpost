const axios = require('axios');
const FormData = require('form-data');

exports.upload = async (auth, file) => {
  const form = new FormData();
  form.append('file', file.content, file.name);

  const response = await axios({
    method: 'post',
    url: `https://${auth.domain}/k/v1/file.json`,
    headers: {
      'X-Cybozu-Authorization': Buffer.from(
        `${auth.username}:${auth.password}`
      ).toString('base64'),
      'Content-Type': form.getHeaders()['content-type'],
      Host: `${auth.domain}:443`,
    },
    data: form,
  });
  return response.data.fileKey;
};
