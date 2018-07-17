/* eslint-disable no-undef */
const chai = require('chai');
const { assert, expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const File = require('../lib/file');

chai.use(chaiAsPromised);

describe('File', () => {
  it('load js file at desktop', () => {
    const params = {
      path: './test/fixture/hoge.js',
    };
    const file = new File(params);
    assert.equal(file.name, 'hoge.js');
    assert.equal(file.size, 279);
    assert.equal(file.platform, 'desktop');
    assert.equal(file.type, 'js');
  });

  it('load js file at mobile', () => {
    const params = {
      path: './test/fixture/hoge.js',
      platform: 'mobile',
    };
    const file = new File(params);
    assert.equal(file.name, 'hoge.js');
    assert.equal(file.size, 279);
    assert.equal(file.platform, 'mobile');
    assert.equal(file.type, 'js');
  });

  it('load css file at desktop', () => {
    const params = {
      path: './test/fixture/hoge.js',
      type: 'css',
    };
    const file = new File(params);
    assert.equal(file.name, 'hoge.js');
    assert.equal(file.size, 279);
    assert.equal(file.platform, 'desktop');
    assert.equal(file.type, 'css');
  });

  it('missing type and missing platform', () => {
    const params = {
      path: './test/fixture/hoge.js',
      platform: 'xbox',
      type: 'html',
    };
    const file = new File(params);
    assert.equal(file.name, 'hoge.js');
    assert.equal(file.size, 279);
    assert.equal(file.platform, 'xbox');
    assert.equal(file.type, 'html');
  });

  it('throw an error', () => {
    const params = {
      path: './misisng.txt',
    };
    expect(() => new File(params)).to.throw();
  });
});
