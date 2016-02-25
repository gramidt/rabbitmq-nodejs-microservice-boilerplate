const Kardia = require('kardia');
const Config = require('./services/ConfigurationService');
const logger = require('./services/LogService');

const healthAppName = Config.get('HEALTH_ENDPOINT_NAME') || 'some-worker-service-change-me';
const healthHost = Config.get('HEALTH_ENDPOINT_HOST') || '0.0.0.0';
const healthPort = Config.get('HEALTH_ENDPOINT_PORT') || 12900;

// Start up the health check endpoint
Kardia.start({ name: healthAppName, host: healthHost, port: healthPort });

logger.info(`Kardia started at ${healthHost}:${healthPort} with service name of ${healthAppName}`);
