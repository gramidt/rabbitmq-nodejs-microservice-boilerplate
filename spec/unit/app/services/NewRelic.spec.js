'use strict'; // eslint-disable-line strict

/* global sandboxRequire */

describe('NewRelic', () => {
  let Config;
  let Log;
  let NewRelic;

  beforeEach(() => {
    Config = jasmine.createSpyObj('config', ['get']);
    Log = jasmine.createSpyObj('log', ['error']);
    NewRelic = {};
  });

  it('will log an error if NewRelic license key is not defined', () => {
    Config.get.and.returnValue(null);

    sandboxRequire('services/NewRelic', {
      './ConfigurationService': Config,
      './LogService': Log,
    });

    expect(Log.error).toHaveBeenCalledWith(jasmine.any(String));
  });

  it('will require NewRelic if the license key is defined', () => {
    Config.get.and.returnValue('some key');

    sandboxRequire('services/NewRelic', {
      './ConfigurationService': Config,
      './LogService': Log,
      newrelic: NewRelic,
    });

    expect(Log.error).not.toHaveBeenCalled();
  });
});
