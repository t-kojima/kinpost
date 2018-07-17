exports.validate = params => {
  params.files.forEach(file => {
    if (
      file.platform &&
      !['desktop', 'mobile'].some(p => p === file.platform)
    ) {
      throw Error(`Invalid params [platform: ${file.platform}]`);
    }
    if (file.type && !['js', 'css'].some(t => t === file.type)) {
      throw Error(`Invalid params [platform: ${file.type}]`);
    }
    if (file.platform === 'mobile' && file.type === 'css') {
      throw Error('Invalid params [platform: mobile and type: css]');
    }
  });
  return true;
};
