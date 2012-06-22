var _ = require('underscore');

var properties = {
  version: '0.0.1',
  debug: true
};

var environmentProperties = {
  development: {},
  production: {
    debug: false
  }
};

function getEnv() {
  return process.env.NODE_ENV || 'development';
}

exports.getProperties = function(environment) {
  environment = environment || getEnv();
  properties.env = environment;

  if (environmentProperties[environment] === undefined) {
    throw new RangeError('No properties for environment \'' + environment + '\'');
  }

  return _.extend(properties, environmentProperties[environment]);
};