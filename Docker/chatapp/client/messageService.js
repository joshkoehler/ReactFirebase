import Ajax from 'simple-ajax';
import io from 'socket.io-client/dist/socket.io';

module.exports = {
  sendMessage: function(posterName, newMessage) {
    var ajax = new Ajax({
      url: "http://localhost:8082/putMessage",
      method: 'PUT',
      data: {name: posterName , message: newMessage},
      dataType: 'json'
    });
    ajax.on('error', (err) => console.log('ERROR', err));
    ajax.send();
  },
  getMessages: function(callback) {
    var ajax = new Ajax({
      url: "http://localhost:8082/getMessages",
      method: 'GET',
      dataType: 'json'
    });
    ajax.on('success', function(event) {
      callback(JSON.parse(ajax.request.response));
    });
    ajax.on('error', (err) => console.log('ERROR', err));
    ajax.send();
  },
  clearMessages: function() {
    var ajax = new Ajax({
      url: "http://localhost:8082/deleteMessages",
      method: 'PUT',
      dataType: 'json'
    });
    ajax.on('error', (err) => console.log('ERROR', err));
    ajax.send();
  },
  listenForMessages: function(callback) {
    io.connect('http://localhost:8082/', { path: '/listen/socket.io'})
      .on('notification', function(data) {
        callback(data.messages);
    });
  }
}
