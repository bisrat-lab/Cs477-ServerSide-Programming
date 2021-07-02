var express = require('express');
var router = express.Router();

  router.get('/stu',(req,res)=>{
    console.log(req.query.fname)
    res.json({
        first : req.query.fname,
        last: req.query.lname,
        zip : "25656"
    })
  })

module.exports = router;