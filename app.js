
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();
app.version = '0.1.1';
var versionator = require('versionator').create(app.version);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(versionator.middleware);
  app.use(express.static(__dirname + '/public', { maxAge: 2592000000 }));
});

app.helpers({
  versionPath: versionator.versionPath
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var chat = ["golly"];

// Routes
app.get('/', routes.index);

function showChat(req, res){
  console.log(chat);
  res.render('chat', {"chat": chat});
}

app.get('/chat', showChat);

app.post('/chat', function(req, res){
  console.log(req.body.Message);

  chat.push(req.body.Message);
  showChat(req, res);
});

app.get('/cycle', function(req, res) {
  var now = new Date()
    , then = new Date('2012-07-31')
    , days
    , weeks;

  days = Math.floor(((((then.getTime() - now.getTime()) / 1000) / 60) / 60) / 24);
  weeks = Math.ceil(days / 7);

  res.render('cycle', {days: days, weeks: weeks});
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});