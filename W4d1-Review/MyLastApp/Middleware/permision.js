const jwt = require('jsonwebtoken');
const JwtManager = require("../jwt/jwtManager")
const secret = 'top-secret';

const authenticateJWT = (req,res,next)=>{
    if(req.url == '/api/auth'){
      next();
      return;
    }
    const header = req.headers.authorization;
    if(!header){
      return res.json({status:' header auth_error'})
    }else{
      // const jwtManager= new JwtManager();
      const token = header.split(' ')[1];
      // const data = jwtManager.verify(token);
      jwt.verify(token,secret,(err,user)=>{
        if (err) {
          return res.sendStatus(403);
      }
      req.user = user;
      next();
      })
      // console.log(req.data.role)
      // if(!data){
      //   return res.json({status: 'auth_error'})
      // }
   
      // next();
    }
  }
  module.exports = authenticateJWT;