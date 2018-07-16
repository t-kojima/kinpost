/* eslint-disable no-undef */
const { assert, expect } = require('chai');
const validate = require('../src/validate');

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

  describe('other file in params', () => {
    const params = {
      overwrite: false,
      files: [
        {
          path: './hoge/fuga/piyo.js',
        },
      ],
    };
    it('success', () => {
      assert.isTrue(validate(params, schema));
    });
  });

  describe('same file in params', () => {
    const params = {
      overwrite: false,
      files: [
        {
          path: './hoge/fuga/mobile.js',
        },
      ],
    };

    it('duplicate', () => {
      expect(() => validate(params, schema)).to.throw(
        'Already exists mobile.js'
      );
    });

    it('not check', () => {
      params.overwrite = true;
      assert.isTrue(validate(params, schema));
    });
  });

  // it('missing file', async () => {
  //   expect(() => loadFile('./test/fixture/hoge2.js')).to.throw(
  //     Error,
  //     'no such file or directory'
  //   );
  // });
});
