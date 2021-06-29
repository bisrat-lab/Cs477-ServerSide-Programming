var express = require('express');
var router = express.Router();
const courses =[
  {id:'CS447', name: "javascript"},
  {id:'CS557', name: "React"}
];
router.get('/',(req,res)=>{
  res.json(courses)

})

// router.post('/',(req,res)=>{
//     console.log(req.body)
//     res.json({status:"done"})
//   })
//   router.get('/',(req,res)=>{
//     console.log(req.query.color)
//     res.json({status:"done"})
//   })

  //! 3000/cources/msd
  // router.get('/: major',(req,res)=>{
  //   console.log(req.param.major) //!msd
  //   res.json({status:"done"})
  // })


module.exports = router;



