//installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//modules for aunthentication

let session =require('express-session');
let passport=require('passport');
let passportLocal= require('passport-local');
let localStrategy =passportLocal.Strategy;
let flash=require('connect-flash');




//database setup
let mongoose= require('mongoose');
let DB= require('./db');

//point mongoose to the db uri
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true });

let mongoDB= mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection Error:'));
mongoDB.once('open',()=>{
console.log('Connected to MongoDB...');

});



let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
//set the routes for contact
let contactsRouter = require('../routes/contact');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));
//book-list will be the page uml after localhost:3000

//setup express session
app.use(session({
secret: DB.Secret,
saveUninitialized: false,
resave: false

}));

//initalize flash
app.use(flash());
//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//passport user config



//creaate a user model instance
let userModel =require('../models/user');
let User =userModel.User;

//implement a user's authentication stratgy
passport.use(User.createStrategy());

//sereialize and deserialize the user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts-list',contactsRouter );



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
