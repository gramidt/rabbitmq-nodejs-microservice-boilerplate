const Kardia = require('kardia');
const Config = require('./services/ConfigurationService');
const logger = require('./services/LogService');

const healthAppName = Config.get('HEALTH_ENDPOINT_NAME') || 'some-worker-service-change-me';
const healthPort = Config.get('HEALTH_ENDPOINT_PORT') || 12900;

// Start up the health check endpoint
Kardia.start({ name: healthAppName, port: healthPort });

logger.info(`Kardia started on ${healthPort} with service name of ${healthAppName}`);
