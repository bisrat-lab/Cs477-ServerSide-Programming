var express = require('express');
var router = express.Router();

  router.get('/',(req,res)=>{
    console.log(req.query.name)
    res.send("completed")
  })

module.exports = router;