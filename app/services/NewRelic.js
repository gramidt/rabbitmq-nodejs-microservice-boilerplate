const Config = require('./ConfigurationService');
const log = require('./LogService');

const licenseKey = Config.get('NEW_RELIC_LICENSE_KEY');

if (!licenseKey) {
  log.error('NEW_RELIC_LICENSE_KEY is not defined');
} else {
  require('newrelic');
}
