var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');

var index = require('./routes/index');
var users = require('./routes/users'); //khai bao dia chi ham 
var good = require('./routes/good');  
var images = require('./routes/images');  
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// connect db

app.use('/', index);
app.use('/users', users); //gắn link router vào hàm
app.use('/good', good); 
app.use('/images', images); 
require('./routes/product.routes.js')(app);

// catch 404 and forward to error handler
app.use(function (error, req, res, next) {
  if (error) { console.log(error.messages) };
  res.status = error.status;
  res.send(error.status + ' Internal server error!');
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


