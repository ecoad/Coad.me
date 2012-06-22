module.exports = {
  name: 'Site',
  version: '0.0.1', 
  description: 'The framework of the site', 
  initialize: function (serviceLocator, done) {
    require('./controller').createRoutes(serviceLocator, __dirname + '/views');
    done();
  }
};