/* eslint-disable no-undef */
const { assert, expect } = require('chai');
const validate = require('../src/validate');

describe('validation', () => {
  it('success', async () => {
    const file = await loadFile('./test/fixture/hoge.js');
    assert.equal(file.name, 'hoge.js');
    assert.equal(file.size, 279);
  });

  // it('missing file', async () => {
  //   expect(() => loadFile('./test/fixture/hoge2.js')).to.throw(
  //     Error,
  //     'no such file or directory'
  //   );
  // });
});
