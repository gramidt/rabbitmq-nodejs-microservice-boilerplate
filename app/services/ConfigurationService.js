'use strict'; // eslint-disable-line strict

class ConfigurationService {

  static get(k) {
    return process.env[k] || null;
  }
}

module.exports = ConfigurationService;
