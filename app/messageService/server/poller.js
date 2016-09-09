var mysql = require('mysql');
var dbConfig = require('./dbConfig').dbConfig;
var connectionsArray = [];

var connection = mysql.createConnection(dbConfig);

var pollingLoop = function() {
  var messages = [];
  // Query the database
  var query = connection.query('SELECT * FROM messages');

  query.on('error', function(err) {
    // Handle error, and 'end' event will be emitted after this as well
    console.log(err);
    updateSockets(err);
  });
  query.on('result', function(message) {
    // it fills our array looping on each user row inside the db
    messages.push(message);
  });
  query.on('end', function() {
    // loop on itself only if there are sockets still connected
    if (connectionsArray.length) {

      setTimeout(pollingLoop, 100);

      updateSockets({
        messages: messages
      });
    } else {
      console.log('No more connections. Ending polling');
    }
  });
};

var updateSockets = function(data) {
  // sending new data to all the sockets connected
  connectionsArray.forEach(function(socket) {
    socket.volatile.emit('notification', data);
  });
};

module.exports = {
  poll: function(socket) {

    // creating a new websocket to keep the content updated without any AJAX request
    socket.on('connection', function(socket) {

      // start the polling only if there were no previous connections
      if (!connectionsArray.length) {
        pollingLoop();
      }

      socket.on('disconnect', function() {
        var socketIndex = connectionsArray.indexOf(socket);
        connectionsArray.splice(socketIndex, 1);
        console.log('socketID = %s got disconnected', socketIndex);
      });

      connectionsArray.push(socket);
      console.log('A new socket is connected!');
    });
  }
}
