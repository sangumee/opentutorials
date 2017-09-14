var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send("Hello Home Page");
});

app.listen(3000, function() {
  console.log('Connected 3000 Port!');
});
