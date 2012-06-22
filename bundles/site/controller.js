module.exports.createRoutes = function(serviceLocator, bundleViewPath) {
  serviceLocator.app.get('/', function(req, res) {
    res.render(bundleViewPath + '/home');
  });

  serviceLocator.app.get('/cycle', function(req, res) {
    var now = new Date()
      , then = new Date('2012-07-31')
      , days
      , weeks;

    days = Math.floor(((((then.getTime() - now.getTime()) / 1000) / 60) / 60) / 24);
    weeks = Math.ceil(days / 7);

    res.render(bundleViewPath + '/cycle', {days: days, weeks: weeks});
  });
};