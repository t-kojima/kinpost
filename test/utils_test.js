/* eslint-disable no-undef */
const { assert, expect } = require('chai');
const { validate } = require('../lib/utils');

describe('validation', () => {
  describe('domain', () => {
    it('throw an error when missing domain', () => {
      expect(() => validate({})).to.throw();
    });
  });

  describe('app', () => {
    it('throw an error when missing app', () => {
      expect(() => validate({ domain: 'hoge' })).to.throw();
    });

    it('throw an error when app is not Number', () => {
      expect(() => validate({ domain: 'hoge', app: 'fuga' })).to.throw();
    });
  });

  describe('username', () => {
    it('throw an error when missing username', () => {
      expect(() => validate({ domain: 'hoge', app: 0 })).to.throw();
    });
  });

  describe('password', () => {
    it('throw an error when missing username', () => {
      expect(() =>
        validate({ domain: 'hoge', app: 0, username: 'fuga' })
      ).to.throw();
    });
  });

  describe('files', () => {
    const auth = {
      domain: 'hoge',
      app: 0,
      username: 'fuga',
      password: 'piyo',
    };

    it('return true when default', () => {
      assert.isTrue(
        validate({
          ...auth,
          files: [{ path: './missing.txt' }],
        })
      );
    });

    it('return true when desktop and css', () => {
      assert.isTrue(
        validate({
          ...auth,
          files: [{ path: './missing.txt', platform: 'desktop', type: 'css' }],
        })
      );
    });

    it('throw an error when xbox', () => {
      expect(() =>
        validate({
          ...auth,
          files: [{ path: './missing.txt', platform: 'xbox', type: 'css' }],
        })
      ).to.throw();
    });

    it('throw an error when html', () => {
      expect(() =>
        validate({
          ...auth,
          files: [{ path: './missing.txt', platform: 'mobile', type: 'html' }],
        })
      ).to.throw();
    });

    it('throw an error when mobile and css', () => {
      expect(() =>
        validate({
          ...auth,
          files: [{ path: './missing.txt', platform: 'mobile', type: 'css' }],
        })
      ).to.throw();
    });
  });
});
