'use strict'; // eslint-disable-line strict

/* global sandboxRequire */

describe('ConfigurationService', () => {
  let Config;

  beforeEach(() => {
    Config = sandboxRequire('services/ConfigurationService',
                            {},
                            { process: { env: { one: 1 } } });
  });

  it('gets a value from the process.env or null', () => {
    expect(Config.get('one')).toBe(1);
    expect(Config.get('two')).toBe(null);
  });
});
