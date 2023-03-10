var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;




var aboutRouter = require('./routes/about');
var costRouter = require('./routes/addcost');
const reportRouter = require('./routes/report');
var app = express();




mongoose.set('strictQuery', false); 
//const uri = "mongodb+srv://orbi:6XaUXi0SEeSOE9A4@cluster0.6jizvyw.mongodb.net/test";
mongoose.connect('mongodb+srv://orbi:6XaUXi0SEeSOE9A4@cluster0.6jizvyw.mongodb.net/test');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/about', aboutRouter);
app.use('/addcost', costRouter);
app.use('/report', reportRouter )

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
