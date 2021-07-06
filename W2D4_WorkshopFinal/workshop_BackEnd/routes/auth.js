const express = require('express');
const router = express.Router();

const JwtManager = require('../jwt/jwtManager');

const jwtManager= new JwtManager();

//log in method
router.post('/', (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    //db or fs can get the pass and username
    if(email==="bisrat@gmail.com" && password ==="123"){
        const data = {};
        data.id = 1;
        data.email = 'bisrat@gmail.com';
        data.createdOn = Date.now();
        data.role = 'basic';

        const token = jwtManager.generate(data); 
        res.json({data:token,status:"sucess"})
    }else{
        res.json({status:"Invalide_user"});
    }
})
module.exports = router;
