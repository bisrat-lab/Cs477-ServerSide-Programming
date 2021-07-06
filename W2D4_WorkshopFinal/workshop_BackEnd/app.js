const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bookRouter = require("./routes/books");
const authRouter = require('./routes/auth');
const JwtManager = require('./jwt/jwtManager');

const jwtManager= new JwtManager();

const app = express();

//!middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//!for all router do this 
// app.use((req,res,next)=>{ //enable the login 
//   if(req.url == '/api/auth'){
//     next();
//     return;
//   }
//   const header = req.headers.authorization;
//   if(!header){
//     return res.json({status:'auth_error'});
//   }else{
//     const data = jwtManager.verify(header.split(' ')[1]);
//     if(!data){
//       return res.json({status: 'auth_error'})
//     }
//     next();
//   }
// })


//!router
app.use("/api/v1/books", bookRouter);
app.use("/api/auth",authRouter);

//! error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.json({ status: "error" });
});
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Your server runing On ${port}`));
