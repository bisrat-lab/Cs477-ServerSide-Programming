//!- Dependencies runs only one times
var express = require("express");
var cookieParser = require("cookie-parser");
var indexRouter = require("./routes/index");
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');


//! -Instantations runs only one times 
var app = express();

//!- Configurations runs only one times
// app.enable('case sensitive routing') //* chack case on url
// app.set('strict routing', true);//* id adding / at the end of url it is error

//!Middleware 
//app.use(cors()) //* please do not check the origin
app.use(express.json()); //* convert the request to js Object and also to acess the body.
app.use(express.urlencoded({ extended: false }));//* reads the URl converts to js Object 
app.use(cookieParser());

//*Exicuite For all the request 
//*app.use((req,res,next)=>) are the same
// app.use('/',(req,res,next)=>{
//   console.log('mw1');
//   next();
// })


// app.use('/',(req,res,next)=>{
//   console.log('mw2');
//   if(!req.headers.authorization){
//     next({status:"autrization error"});
//   }
//   next();
// })

// app.use('/',(req,res,next)=>{
//   console.log('mw3');
//   next()
// })

//! - Route
// app.get('/test',(req,res,next)=>{
//   // next({status:'fail'})
//   next();
//   // res.json({data: 'data2'})
// })
//!Auth 


app.use('/api/auth',authRouter);
app.use("/users", userRouter);

//* if we have the same route

//! - error handler
//* - it takes 4 parameter 
app.use(function (err, req, res, next) {
  console.log(err)
  next(err);
//  res.json(err);
});

app.use(function (err, req, res, next) {
  console.log('Another error handler')
  console.log(err);
 res.json(err);
}); 
//!- Bootup runs only one times
app.listen(3008);

