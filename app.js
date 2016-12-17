var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pgp = require('pg-promise')();
var db = pgp('postgres://LuisZenaidoHernandez@localhost:5432/gamedata');


var index = require('./routes/index');
var users = require('./routes/users');
var rankings = require('./routes/rankings');
var chestgame = require('./routes/chestgame')

var app = express();
app.set(db);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/rankings',rankings);
app.use('/chestgame',chestgame);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
/**
 *var express = require('express');
 var app = express();
 var bp = require('body-parser');


 app.use(express.static(__dirname + '/public'));

 app.set('view engine', 'ejs');

 app.set('views', __dirname+'/views');

 app.use(bp.urlencoded({ extended: false }))

 app.use(bp.json())

 app.use( function( req, res, next ) {
  if(req.query.method == 'delete') {
    req.method = 'DELETE';
    req.url = req.path;
  }
  next();
});

 app.get('/', function(req,res,next){
  db.any('SELECT * FROM posts')
    .then(function(posts){
      return res.render('index', {posts: posts})
    })
    .catch(function(err){
      return next(err);
    });
});

 app.get('/:id/show', function(req,res,next){
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM posts WHERE id=$1', id)
    .then(function(posts){
      return res.render('show', {posts: posts})
    })
    .catch(function(err){
      return next(err);
    });
});

 app.get('/posts/:id/edit', function(req,res,next){
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM posts WHERE id = $1', id)
    .then(function (posts) {
      res.render('edit', {posts: posts})
    })
    .catch(function (err) {
      return next(err);
    });
});


 app.get('/posts/new', function(req,res,next){
  res.render('new');
});


 app.post('/posts/new', function(req,res,next){
  var id = parseInt(req.params.id);
  db.none('INSERT INTO posts(title, content) VALUES ($1,$2)',
     [req.body.title, req.body.content])
    .then(function (posts) {
      res.redirect('/');
    })
    .catch(function (err) {
      return next(err);
    });
});

 app.post('/posts/:id/edit', function(req,res,next){
   db.none('UPDATE posts SET title=$1, content=$2 WHERE id=$3',
      [req.body.title, req.body.content, parseInt(req.params.id)])
      .then(function () {
        res.redirect('/');
      })
      .catch(function (err) {
        return next(err);
      });
});


 */