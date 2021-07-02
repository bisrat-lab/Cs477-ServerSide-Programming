var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const empRouter = require('./routes/emp');

var app = express();

// view engine setup

//!case sensitive routing
//app.enable('case sensitive routing'); 
//!/user is allowed /user/is not allowed  
//app.set('strict-routing',true)

app.use(logger('dev')); //show log info in console PUT /users/2 200 1.872 ms - 28
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//! Middleware
app.use((req,res,next)=>{
  console.log('mw1')
  next()
})
// .

// app.use('/',(req,res,next)=>{
//   console.log("Miidle");
//   if(!req.headers.authorization){
//     next({status : " authorization error",massage: 'no header'})
//   }
//   next({status : "error"})
// })

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use("/api/v1/emp",empRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  next(err)
  //res.json(err)
  
});
app.use(function(err, req, res, next) {
  console.log("error");
  res.json(err)
  // set locals, only providing error in development
  // res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});
const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`Server runing on Port ${port}`));
// module.exports = app;
