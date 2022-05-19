// Requiring the packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Requiring the routes
var v1indexRouter = require('./routes/index1');
var v1usersRouter = require('./routes/users1');
var v1booksRouter = require('./routes/books1');
var v2booksRouter = require('./routes/books2');
var v2commentsRouter = require('./routes/comments2');
var v3booksRouter = require('./routes/books3');
var v3commentsRouter = require('./routes/comments3');

// Connecting to mongoose
mongoose.connect(
  'mongodb://localhost/BookStoreAPI',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    console.log('Connected to database: ', error ? false : true);
  }
);

// Instantiating the application
var app = express();

// Using middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Using the Routes
//For Version 1 API
app.use('/api/v1', v1indexRouter);
app.use('api/v1/users', v1usersRouter);
app.use('api/v1/books', v1booksRouter);
//For Version 2 API
app.use('/api/v2', v1indexRouter);
app.use('api/v2/users', v1usersRouter);
app.use('api/v2/books', v2booksRouter);
app.use('api/v2/comments', v2commentsRouter);
//For Version 3 API
app.use('/api/v3', v1indexRouter);
app.use('api/v3/users', v1usersRouter);
app.use('api/v3/books', v3booksRouter);
app.use('api/v3/comments', v3commentsRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
