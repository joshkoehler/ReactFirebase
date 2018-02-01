var express = require('express');
var bodyParser = require('body-parser');
var poller = require('./poller.js');

var getMessages = require('./routes/getMessages.js');
var deleteMessages = require('./routes/deleteMessages.js');
var putMessage = require('./routes/putMessage.js');

var app = express();
var server = require('http').Server(app);
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8081");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT");
  next();
});

/* Set up the routes */
app.get("/getMessages", function(req, res) {
  getMessages.execute(req, res);
});
app.put("/deleteMessages", function(req, res) {
  deleteMessages.execute(req, res);
});
app.put("/putMessage", function(req, res) {
  putMessage.execute(req, res);
});
app.get("/listen/socket.io", function(req, res) {
  res.json(poller.poll(require('socket.io')(server, {path: '/listen/socket.io'})));
});

server.listen(8082, "0.0.0.0");
