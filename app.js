var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require("express-session")
var flash = require('connect-flash');
var connectMongo = require("connect-mongo");
var passport = require("passport")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var MongoStore = connectMongo(session)

// create store save session in mongodb
var sessionStore = new MongoStore({
  url :  `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  autoReconnect : true,
  //autoRemove : "native" -> default
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(passport.initialize()) // config passport
app.use(passport.session())
app.use(flash());
app.use(session({
  key: "express.sid",
  secret: "mySecret",
  store : sessionStore,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000 // 1 day 
  }
}));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;