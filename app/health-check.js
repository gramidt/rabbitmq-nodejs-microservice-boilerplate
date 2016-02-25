const Kardia = require('kardia');
const Config = require('./services/ConfigurationService');

const healthAppName = Config.get('HEALTH_ENDPOINT_NAME') || 'some-worker-service-change-me';
const healthCheckHost = Config.get('HEALTH_ENDPOINT_HOST') || '0.0.0.0';
const healthPort = Config.get('HEALTH_ENDPOINT_PORT') || 12900;

// Start up the health check endpoint
Kardia.start({ name: healthAppName, host: healthCheckHost, port: healthPort });
