exports.validate = ({ files }) => {
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
