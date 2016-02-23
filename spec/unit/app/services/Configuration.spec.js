/* global requireSubject */

describe('ConfigurationService', () => {
  let config;

  beforeEach(() => {
    config = requireSubject('app/service/ConfigurationService',
                            {},
                            { process: { env: { once: 1 } } }).default;
  });

  it('gets a value from the process.env or null', () => {
    expect(config.get('one')).toBe(1);
    expect(config.get('two')).toBe(null);
  });
});
