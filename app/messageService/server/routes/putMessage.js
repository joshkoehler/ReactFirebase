var mysql = require('mysql');
var dbConfig = require('../dbConfig').dbConfig;

module.exports = {
  execute: function(req, res) {
    var body = req.body;
    var connection = mysql.createConnection(dbConfig);

    connection.connect();
    connection.query('INSERT into messages (name, message) values("' + body.name + '", "' + body.message + '")', function(error, rows, fields) {
      if (error) {console.log(error); return;}
    });

    connection.end(function(err) {
      // Do nothing
    });

    res.end();
  }
}