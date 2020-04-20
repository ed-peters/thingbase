const app = require('../../src/app');

describe('\'entities\' service', () => {
  it('registered the service', () => {
    const service = app.service('entities');
    expect(service).toBeTruthy();
  });
});
