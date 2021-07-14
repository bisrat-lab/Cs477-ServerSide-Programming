const express = require('express');
const router = express.Router();
const JwtManager = require('../jwt/jwtManager');

const jwtManager= new JwtManager();
//!login method
const users = [
    {
        email: 'bis@gmail',
        password: '456',
        role: 'admin'
    }, {
        email: 'alex@gmail',
        password: '123',
        role: 'member'
    }
]; 

router.post('/',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const user = users.find(u => {return u.email === email && u.password === password})
    if(user){
        const token = jwtManager.genreate({email: user.email, role: user.role});
        res.json({result: token, status:'sucess'})
    }else{
        res.json({status:'INvalid_user'})
    }
})

module.exports = router;
