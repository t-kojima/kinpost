/* eslint-disable no-undef */
const { assert } = require('chai');
const Schema = require('../src/schema');

describe('Schema', () => {
  let schema;
  beforeEach(() => {
    schema = new Schema(
      {
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
      },
      0
    );
  });

  describe('Schema#exists', () => {
    it('return true', () => {
      const file = {
        path: './hoge/fuga/mobile.js',
        name: 'mobile.js',
        platform: 'mobile',
        type: 'js',
      };
      assert.isTrue(schema.exists(file));
    });

    it('return true', () => {
      const file = {
        path: './sample.js',
        name: 'sample.js',
        platform: 'desktop',
        type: 'js',
      };
      assert.isTrue(schema.exists(file));
    });

    it('return false', () => {
      const file = {
        path: './hoge/fuga/fuga.js',
        name: 'fuga.js',
        platform: 'desktop',
        type: 'js',
      };
      assert.isFalse(schema.exists(file));
    });
  });

  describe('Schema#update', () => {
    it('append a entry', () => {
      schema.update(
        [
          {
            path: './missing.css',
            name: 'missing.css',
            platform: 'desktop',
            type: 'css',
            size: 2000,
          },
        ],
        { 'missing.css': 'TESTFILEKEYSTRING' }
      );
      assert.deepEqual(schema.body, {
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
          css: [
            {
              type: 'FILE',
              file: {
                fileKey: 'TESTFILEKEYSTRING',
                name: 'missing.css',
                size: 2000,
              },
            },
          ],
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
        app: 0,
        revision: '15',
      });
    });

    it('update a entry', () => {
      schema.update(
        [
          {
            path: './sample.js',
            name: 'sample.js',
            platform: 'desktop',
            type: 'js',
            size: 2000,
          },
        ],
        { 'sample.js': 'TESTFILEKEYSTRING' }
      );
      assert.deepEqual(schema.body, {
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
                fileKey: 'TESTFILEKEYSTRING',
                name: 'sample.js',
                size: 2000,
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
        app: 0,
        revision: '15',
      });
    });
  });
});
