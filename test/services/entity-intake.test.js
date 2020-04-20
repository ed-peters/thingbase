const app = require('../../src/app');

describe('\'entity-intake\' service', () => {
  it('registered the service', () => {
    const service = app.service('entity-intake');
    expect(service).toBeTruthy();
  });
});
