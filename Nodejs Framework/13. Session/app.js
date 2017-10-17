var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var OrientoOrientoStore = require('connect-oriento')(session);
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(session({
  secret: '2983718947@ROFKAMVVAAKDIWY',
  resave: false,
  saveUninitialized: true,
  new OrientoStore({
    server: 'host=localhost&port=2424&username=root&password=password123&db=test'
  })
}));

app.get('/count', function(req, res) {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send('Count : ' + req.session.count);
});

app.get('/auth/logout', function(req, res) {
  delete req.session.displayName;
  req.session.save(function() {
    res.redirect('/welcome');
  });
});

app.get('/welcome', function(req, res) {
  if (req.session.displayName) {
    res.send(`
      <h1>hello, ${req.session.displayName}</h1>
      <a href="/auth/logout">Logout</a>
      `);
  } else {
    res.send(`
      <h1>Welcome</h1>
      <a href="/auth/login">Login</a>
      `);
  }
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
