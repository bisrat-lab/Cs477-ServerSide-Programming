const express = require('express');
const router = express.Router();
const JwtManager = require('../jwt/jwtManager');

const jwtManager= new JwtManager();

router.post('/',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    if(email ==='bisrat@gmail.com'&&password==='123'){
        const data = {};
        data.id = 1;
        data.email = 'bisrat@gmail.com';
        data.createdOn = Date.now();
        data.role = 'client';

        const token = jwtManager.genreate(data);
        res.json({result: token, status:'sucess'})
    }else{
        res.json({status:'INvalid_user'})
    }
})

module.exports = router;

