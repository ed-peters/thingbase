const app = require('../../src/app');

describe('\'entity-types\' service', () => {
  it('registered the service', () => {
    const service = app.service('entity-types');
    expect(service).toBeTruthy();
  });
});
