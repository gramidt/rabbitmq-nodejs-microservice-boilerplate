const Config = require('./ConfigurationService');
const Log = require('./LogService');

const licenseKey = Config.get('NEW_RELIC_LICENSE_KEY');

if (!licenseKey) {
  Log.error('NEW_RELIC_LICENSE_KEY is not defined');
} else {
  require('newrelic');
}
