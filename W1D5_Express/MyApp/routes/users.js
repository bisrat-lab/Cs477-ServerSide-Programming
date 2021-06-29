var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");

router.get('/',(req,res)=>{
  const users = fs.readFileSync(path.join(__dirname,'./users.txt'));
  const lines = users.toString().split('\n');
  const userObject = [];

  lines.forEach((line)=>{
    const token = line.split('-');
    const user = {
      id: token[0],
      firstName: token[1],
      lastName: token[2]
    }
    userObject.push(user)
    console.log(userObject);
  })
  res.json(userObject); 

})

router.post('/',(req,res)=>{
  const users = fs.readFileSync(path.join(__dirname,'./users.txt'));

  const lines = users.toString().split('\n');
  const userObject = [];

  lines.forEach((line)=>{
    const token = line.split('-');
    const user = {
      id: token[0],
      firstName: token[1],
      lastName: token[2]
    }
    userObject.push(user)
    console.log(userObject);
  })
  let exists = false;
  for(let i=0;i<userObject.length;i++){
    if(userObject[i].id == req.body.id){
      exists = true;
      break;
     
    }
  }
  if(exists){
    res.end("user already there");
  }else{
    const newUserStream = fs.createWriteStream(path.join(__dirname,'./users.txt'),{
    flags:'a+'
  })
  newUserStream.write(req.body.id +'-'+req.body.firstName+'-'+req.body.lastName+'\n');
  newUserStream.end();
  res.end("completed")
  }
  
})


module.exports = router;
