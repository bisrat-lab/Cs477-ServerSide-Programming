//!Dependences (we have impore ot require here)
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var courseRouter = require('./routes/cources')
var sttudentRouter = require('./routes/student')

//! instantiations our app (initalization our application)
var app = express();

//! configration or  view engine setup  
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//!Middleware "whenever we are using use"

app.use(logger('dev'));
app.use(express.json()); //conver to parese the body => json 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//serve static file 
//! custome Middleware

app.use((req, res, next) => {
 console.log('This always run');
 next();
});


app.use('/users',(req,res,next)=>{
  console.log('MW1')
  next();
})

app.use('/',(req,res,next)=>{
  console.log("user")
  if(req.method === 'GET'){
    const logStream = fs.createWriteStream(path.join(__dirname,'acess.log'),{
      flags:'a+'
    })
    logStream.write(req.method + ' ' + req.url + ' '+ new Date()+'\n')
    logStream.end();
  }
  next();
})

app.use('/courses',(req,res,next)=>{
  console.log('MW3')
  next();
})
//! Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses',courseRouter)
app.use('/student',sttudentRouter)

app.get('/product',(req,res)=>{
  res.send("<h1> hello Express</h1>")
  res.json({age:20})

})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//! Error Handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//! Bootup 
app.listen(2021)

//module.exports = app;
