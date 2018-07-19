exports.validate = ({ domain, app, username, password, files }) => {
  if (!domain) {
    throw Error('Missing domain parameter');
  }
  if (Number.isNaN(Number(app))) {
    throw Error('app parameter is not Number');
  }
  if (!username) {
    throw Error('Missing username parameter');
  }
  if (!password) {
    throw Error('Missing password parameter');
  }

  files.forEach(({ platform, type }) => {
    if (platform && !['desktop', 'mobile'].some(p => p === platform)) {
      throw Error(`Invalid params [platform: ${platform}]`);
    }
    if (type && !['js', 'css'].some(t => t === type)) {
      throw Error(`Invalid params [platform: ${type}]`);
    }
    if (platform === 'mobile' && type === 'css') {
      throw Error('Invalid params [platform: mobile and type: css]');
    }
  });
  return true;
};
