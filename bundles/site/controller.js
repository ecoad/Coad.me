module.exports.createRoutes = function(serviceLocator, bundleViewPath) {
  serviceLocator.app.get('/', function(req, res) {
    res.render(bundleViewPath + '/home');
  });
};