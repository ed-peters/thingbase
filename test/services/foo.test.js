const app = require('../../src/app');

describe('\'foo\' service', () => {
  it('registered the service', () => {
    const service = app.service('foo');
    expect(service).toBeTruthy();
  });
});
