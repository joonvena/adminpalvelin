const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');
const db = require('./config/keys').mongoURI;

const adminRouter = require('./routes/adminRoute');
const insuranceProfileRoute = require('./routes/insuranceProfileRoute');
const adminInsuranceRoute = require('./routes/adminInsuranceRoute');
const applicationRouter = require('./routes/applicationRoute');


const app = express();

//Database connection
mongoose.connect(db);

mongoose.connection.on('connected', function () {
    console.log('Connection succesful');
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose error' + err);
});

mongoose.Promise = global.Promise;

//Passport settings

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//ALLOWS CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, authorization, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
//ROUTES
app.use('/', adminRouter);
app.use('/customerprofile', insuranceProfileRoute);
app.use('/document', adminInsuranceRoute);
app.use('/application', applicationRouter);


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
