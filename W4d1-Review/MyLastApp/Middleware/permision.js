const jwt = require('jsonwebtoken');
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
     
      const token = header.split(' ')[1];
      jwt.verify(token,secret,(err,user)=>{
        if (err) {
          return res.sendStatus(403);
      }
      req.user = user;
      next();
      })
    }
  }
  module.exports = authenticateJWT;