var express = require('express')
  , serviceLocator = require('service-locator').createServiceLocator()
  , app = express.createServer()
  , properties = require('./properties').getProperties()
  , bundled = require('bundled')(serviceLocator)
  , versionator = require('versionator').create(properties.version);

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(versionator.middleware);
  app.use(express.static(__dirname + '/public', { maxAge: 2592000000 }));
  app.use(express.errorHandler({ dumpExceptions: properties.debug, showStack: properties.debug }));
});

app.helpers({
  versionPath: versionator.versionPath
});

serviceLocator.register('app', app);

bundled.addBundles(__dirname + '/bundles/', ['site']);
bundled.initialize(function(){
  console.log('project init');
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});