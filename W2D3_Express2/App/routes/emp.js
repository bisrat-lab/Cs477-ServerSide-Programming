const express = require("express");
const fs = require("fs");
const { userInfo } = require("os");
const { join } = require("path");
const path = require("path");
const router = express.Router();

function readFileFun(){
    const readEmp = fs.readFileSync(path.join(__dirname, "users.txt")).toString();
    const line = readEmp.split("\n");
    const empObj = [];
    line.forEach((item) => {
      const eachEmp = item.split("-");
      const token = {
        id: eachEmp[0],
        firstName: eachEmp[1],
        lastName: eachEmp[2],
      };
      empObj.push(token);
    });
    return empObj;
}
router.get("/", (req, res) => {
  let empArr = readFileFun();
  res.json(empArr);
});

router.get("/:id", (req, res) => {
  const readEmp = fs.readFile(
    path.join(__dirname, "users.txt"),
    (err, data) => {
      const line = data.toString().split("\n");
      const result = [];
      const id = req.params.id;
      line.forEach((item) => {
        const eachEmp = item.split("-");
        const token = {
          id: eachEmp[0],
          firstName: eachEmp[1],
          lastName: eachEmp[2],
        };
        result.push(token);
      });
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        if (id == result[i].id) {
          res.json({ status: "User Found", data: result[i] });
          return;
        }
      }

      res.json({ status: "sucess", data: "user Not found" });
    }
  );
});

router.post("/", (req, res) => {
  const newEmp = req.body;
  const writeNewStream = fs.createWriteStream(
    path.join(__dirname, "users.txt"),
    { flags: "a" }
  );
  writeNewStream.write("\n");
  writeNewStream.write(
    newEmp.id + "-" + newEmp.firstName + "-" + newEmp.lastName
  );
  writeNewStream.end();
  res.json({ massage: "New user added" });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  let empArr = readFileFun();

  for (let i = 0; i < empArr.length; i++) {
    if (id == empArr[i].id) {
      let result = empArr.filter((emp) => {
        return id !== emp.id;
      });
      const writeStream = fs.createWriteStream(
        path.join(__dirname, "users.txt")
      );
      result.forEach((item) => {
        writeStream.write(item.id + "-" + item.firstName + "-" + item.lastName);
        writeStream.write("\n");
      });
      writeStream.end();
      res.json({ status: "User Found" });
      return;
    }
  }
  res.json({ status: `User ID ${id} is Not found` });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const readEmp = fs.readFileSync(path.join(__dirname, "users.txt")).toString();
  const line = readEmp.split("\n");
  const empObj = [];
  line.forEach((item) => {
    const eachEmp = item.split("-");
    const token = {
      id: eachEmp[0],
      firstName: eachEmp[1],
      lastName: eachEmp[2],
    };
    empObj.push(token);
  });
  let updated = empObj
    .map((item) => {
      return item.id;
    })
    .indexOf(id);
  if (updated !== -1) {
    empObj[updated] = {
      id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    const writeStream = fs.createWriteStream(path.join(__dirname, "users.txt"));
    empObj.forEach((item) => {
      writeStream.write(item.id + "-" + item.firstName + "-" + item.lastName);
      
      writeStream.end();
    });
    res.json({ status: "User updated" });
    return;
  }

  console.log(empObj);
  res.json({ status: `User ID ${id} is Not found` });
});

module.exports = router;
