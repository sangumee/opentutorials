module.exports = function() {
  var OrientDB = require('orientjs');
  var server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: 'password123'
  });
  var db = server.use('o2');
  return db;
}
