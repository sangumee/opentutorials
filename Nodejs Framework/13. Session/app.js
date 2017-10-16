var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(session({
  secret: '2983718947@ROFKAMVVAAKDIWY',
  resave: false,
  saveUninitialized: true
}));

app.get('/count', function(req, res) {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send('Count : ' + req.session.count);
});

app.post('/auth/login', function(req, res) {
  var user = {
    username: 'sangumee',
    password: '1111',
    displayName: 'Sangumee'
  };
  var uname = req.body.username;
  var pwd = req.body.password;
  if (uname === user.username && pwd === user.password) {
    req.session.displayName = user.displayName;
    res.redirect('/welcome');
  } else {
    res.send('Login Failed! <a href="/auth/login">Login</a>');
  }
});

app.get('/auth/login', function(req, res) {
  var output = `
  <h1>Login Page</h1>
  <form action="/auth/login" method="post">
    <p>
      <input type="text" name="username" placeholder="username">
    </p>
    <p>
      <input type="password" name="password" placeholder="password">
    </p>
    <p>
    <input type="submit">
    </p>
  </form>
  `

  res.send(output);
});

app.listen(3000, function() {
  console.log('Connected 3000 Port!');
});
