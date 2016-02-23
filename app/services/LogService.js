import winston from 'winston';

//
//  Importing 'winston-papertrail' will expose 'winston.transports.Papertrail'
//
import 'winston-papertrail';
import config from './ConfigurationService';

const logger = new winston.Logger();
const logHost = config.get('LOG_HOST') || '0.0.0.0';
const logPort = config.get('LOG_PORT') || 12345;

// Write logs to the console
logger.add(winston.transports.Console, {
  level: 'debug',
});

logger.add(winston.transports.Papertrail, {
  host: logHost,
  port: logPort,
});

if (!logHost) {
  logger.error('LOG_HOST for Papertrail is not defined');
}

if (!logPort) {
  logger.error('LOG_PORT for Papertrail is not defined');
}

export default logger;
