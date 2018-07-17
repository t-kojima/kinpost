/* eslint-disable no-undef */
const { assert, expect } = require('chai');
const { validate } = require('../lib/utils');

describe('validation', () => {
  it('return true when default', () => {
    assert.isTrue(
      validate({
        files: [{ path: './missing.txt' }],
      })
    );
  });

  it('return true when desktop and css', () => {
    assert.isTrue(
      validate({
        files: [{ path: './missing.txt', platform: 'desktop', type: 'css' }],
      })
    );
  });

  it('throw an error when xbox', () => {
    expect(() =>
      validate({
        files: [{ path: './missing.txt', platform: 'xbox', type: 'css' }],
      })
    ).to.throw();
  });

  it('throw an error when html', () => {
    expect(() =>
      validate({
        files: [{ path: './missing.txt', platform: 'mobile', type: 'html' }],
      })
    ).to.throw();
  });

  it('throw an error when mobile and css', () => {
    expect(() =>
      validate({
        files: [{ path: './missing.txt', platform: 'mobile', type: 'css' }],
      })
    ).to.throw();
  });
});
