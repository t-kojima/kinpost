/* eslint-disable no-undef */
const { assert } = require('chai');
const { exists } = require('../src/utils');

describe('validation', () => {
  const schema = {
    scope: 'ALL',
    desktop: {
      js: [
        {
          type: 'URL',
          url: 'https://www.example.com/example.js',
        },
        {
          type: 'FILE',
          file: {
            contentType: 'application/javascript',
            fileKey: '20150519023802B3EB762E870645F889B22F9D4F1F3059023',
            name: 'sample.js',
            size: '12345',
          },
        },
      ],
      css: [],
    },
    mobile: {
      js: [
        {
          type: 'FILE',
          file: {
            contentType: 'application/javascript',
            fileKey: '20140823043800E9F53A742F7F4416B6E47234DBD6C0D4025',
            name: 'mobile.js',
            size: '12345',
          },
        },
        {
          type: 'URL',
          url: 'https://www.example.com/example-mobile.js',
        },
      ],
    },
    revision: '15',
  };

  it('is exists', () => {
    assert.isTrue(exists(schema, './hoge/fuga/mobile.js'));
  });

  it('is exists', () => {
    assert.isTrue(exists(schema, './sample.js'));
  });

  it('is not exists', () => {
    assert.isFalse(exists(schema, './hoge/fuga/fuga.js'));
  });
});
