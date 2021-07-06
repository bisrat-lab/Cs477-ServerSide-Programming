const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const JwtManager = require('./jwt/jwtManager')
const productRouter = require('./routes/products');
const courseRouter = require('./routes/courses')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req,res,next)=>{
  if(req.url == '/api/auth'){
    next();
    return;
  }
  const header = req.headers.authorization;
  if(!header){
    return res.json({status:'auth_error'})
  }else{
    const jwtManager= new JwtManager();
    const data = jwtManager.verify(header.split(' ')[1]);
    if(!data){
      return res.json({status: 'auth_error'})
    }
    next();
  }
})

app.use('/api/auth',authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/courses', courseRouter);

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
    res.json({status:'error'})
});

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Your server runing On ${port}`));
