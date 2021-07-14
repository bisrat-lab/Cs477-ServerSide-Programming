var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const authenticateJWT = require('../Middleware/permision')

function readFile() {
  const data = fs.readFileSync(path.join(__dirname, "users.txt")).toString();
  const userArray = [];
  const line = data.split("\n");
  line.forEach((item) => {
    const attributes = item.split("-");
    const user = {
      id: attributes[0],
      firstname: attributes[1],
      lastname: attributes[2],
    };
    userArray.push(user);
  });
  return userArray;
}
router.get("/", (req, res) => {
  const users = readFile();
  res.json({ status: "sucess", users });
});

router.get("/:id", (req, res) => {
  const users = readFile();
  const index = users.map((item) => item.id).indexOf(req.params.id);
  if (index !== -1) {
    res.json({ status: "sucess", data: users[index] });
  } else {
    res.json({ status: "sucess", massage: `user Not found` });
  }
});

router.post("/", (req, res) => {
  const users = readFile();
  const index = users.map((item) => item.id).indexOf(req.body.id);

  if (index == -1) {
    const writeSream = fs.createWriteStream(
      path.join(__dirname, "users.txt"),
      { flags: "a" }
    );
    writeSream.write("\n");
    writeSream.write(
      req.body.id + "-" + req.body.firstname + "-" + req.body.lastname
    );
    writeSream.end();
    res.json({ status: "sucess" });
  } else {
    res.json({ status: "sucess", massage: "id found" });
  }
});

router.put("/:id", (req, res) => {
    const users = readFile(); 
    const index = users.map((item) => item.id).indexOf(req.params.id);
  if (index !== -1) {
    users[index] = {
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    };
    const writeSream = fs.createWriteStream(path.join(__dirname,"users.txt"));
    users.forEach((item)=>{
      writeSream.write(item.id+'-'+item.firstname+"-"+item.lastname)
      writeSream.write('\n');
      })
      writeSream.end();
    res.json({ status: "sucess" });
  }else{
    res.json({status:"sucess", massage: "User ID Not Found"})
  }
});

router.delete("/:id",authenticateJWT,(req, res) => {
    const users = readFile();
    console.log(req.user.role);
    if(req.user.role !== 'admin'){
      res.json({massage:"Your are not admin"});
    }else{ 
    const index = users.map((item)=>item.id).indexOf(req.params.id );
    if(index !== -1){
        users.splice(index,1);
        const writeS = fs.createWriteStream(path.join(__dirname,'users.txt'));
        
        users.forEach((item)=>{
            console.log(item.name)
            writeS.write(item.id+'-'+item.firstname+'-'+item.lastname);
            
            writeS.write('\n');
        })
        writeS.end();
        res.json({status: "sucess",massage:"User_Deleted"});
    }else{
        res.json({status:"sucess",massage:"user_not_found"});
    }
  }
});

module.exports = router;
