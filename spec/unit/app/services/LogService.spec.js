/* global requireSubject */

describe('LogService', () => {
  let LogService;
  let Config;
  let winston;
  let logger;

  beforeEach(() => {
    logger = jasmine.createSpyObj('logger', ['add', 'error']);
    winston = jasmine.createSpyObj('winston', ['Logger']);
    winston.transports = {
      Console: jasmine.createSpy('console-transport'),
      Papertrail: jasmine.createSpy('winston-papertrail'),
    };

    winston.Logger.and.returnValue(logger);

    Config = jasmine.createSpyObj('ConfigurationService', ['get']);
  });

  it('should create a console transport using defaults', () => {
    LogService = requireSubject('app/services/LogService', {
      winston,
      'winston-papertrail': {},
      './ConfigurationService': Config,
    }).default;

    expect(LogService).not.toBe(null);
    expect(logger.add.calls.argsFor(0)[0]).toBe(winston.transports.Console);
    expect(logger.add.calls.argsFor(1)[0]).toBe(winston.transports.Papertrail);
  });

  it('should create a console transport using configurations', () => {
    Config.get.and.returnValue(1);

    LogService = requireSubject('app/services/LogService', {
      winston,
      'winston-papertrail': {},
      './ConfigurationService': Config,
    }).default;

    expect(LogService).not.toBe(null);
    expect(logger.add.calls.argsFor(0)[0]).toBe(winston.transports.Console);
    expect(logger.add.calls.argsFor(0)[1]).toBe(winston.transports.Papertrail);
  });
});
