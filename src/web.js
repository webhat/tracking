var express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    bodyParser = require('body-parser'),
    redis = require('redis');

// Cofiguration
app.use(cookieParser());
app.use(bodyParser());
app.use('/', express.static('src'));
app.use('/', express.static('build'));
app.use(cookieSession({secret: 'refulgenceherringglueeffluent'}));

app.set('port', (process.env.PORT || 5000))

// Redis
var client = redis.createClient();
client.on('connect', function() {
  console.log('connected');
});
client.on("error", function (err) {
  console.log("Error " + err);
});

// Routes

app.get('/', function(request, response) {
  response.sendfile('build/index.html');
});

app.get('/fingerprint.js', function(request, response) {
  response.sendfile('node_modules/fingerprintjs2/fingerprint2.js');
});

app.post('/identified', function( request , response) {
  var ident = request.body;
  console.log(ident);
  for(var key in ident) {
    client.get(ident[key], redis.print);
    client.incr(ident[key], redis.print);
  }
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
