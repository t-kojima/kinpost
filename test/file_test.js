/* eslint-disable no-undef */
const chai = require('chai');
const { assert, expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { loadFile } = require('../src/file');

chai.use(chaiAsPromised);

describe('file load', () => {
  it('load success', async () => {
    const file = await loadFile('./test/fixture/hoge.js');
    assert.equal(file.name, 'hoge.js');
    assert.equal(file.size, 279);
  });

  it('throw error', () => expect(loadFile('./missing.txt')).to.be.rejected);
});
