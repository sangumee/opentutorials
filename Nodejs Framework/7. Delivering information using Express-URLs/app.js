var express = require('express');
var app = express();
var path = require('path');
app.locals.pretty=true;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));

app.get('/topic/:id',function(req, res){
  var topics=[
    'Javascript is...',
    'Nodejs is...',
    'Express is...'
  ];
  var output=`
  <a href="/topic?id=0">JavaScript</a><br>
  <a href="/topic?id=1">Nodejs</a><br>
  <a href="/topic?id=2">Express</a><br><br>
  ${topics[req.params.id]}
  `
  res.send(output);
});

app.get('/topic/:id/:mode',function(req,res){
  res.send(req.params.id+','+req.params.mode);
});

app.get('/template',function(req,res){
  res.render('temp',{time:Date(),title:'Pug'});
});
app.get('/', function(req, res){
    res.send('Hello home page');;
});

app.get('/dynamic',function(req,res){
  var lis='';
  for(var i=0;i<5;i++){
    lis=lis+'<li>coding</li>';
  }

  var time=Date();
  var output=`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello, Dynamic!
      <ul>
      ${lis}
      </ul>
      ${time}
    </body>
  </html>
`;
  res.send(output);
});

app.get('/route', function(req, res){
    res.send('Hello Router, <img src="/rabbit.jpg">')
})
app.get('/login', function(req, res){
    res.send('<h1>Login please</h1>');
});
app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});
