class ConfigurationService {

  static get(k) {
    return process.env[k] || null;
  }

}

export default ConfigurationService;
