var mysql = require('mysql');
var dbConfig = require('../dbConfig').dbConfig;

module.exports = {
  execute: function(req, res) {
    var connection = mysql.createConnection(dbConfig);

    connection.connect();
    connection.query('SELECT * from messages', function(error, rows, fields) {
      if (error) {console.log(error); return;}
      res.json(rows);
    });

    connection.end(function(err) {
      // Do nothing
    });
  }
}