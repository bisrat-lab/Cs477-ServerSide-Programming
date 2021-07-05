const express = require('express');
const fs = require('fs');
const path = require('path')
const router = express.Router();
const booksmember = require('../bookmember')
router.get('/',(req,res)=>{
  // const readFile = fs.readFileSync(path.join(__dirname,'books.txt'))
  // const jsonData = JSON.parse(readFile)
  console.log(booksmember)
  res.json({status:"sucess", data: booksmember})
  
})

router.get('/:id',(req,res)=>{
  const readFile = fs.readFileSync(path.join(__dirname,'books.txt'))
  const jsonData = JSON.parse(readFile);

  const getIndex = jsonData.map(item=> item.id).indexOf(req.params.id)
  if(getIndex !== -1){
    res.json(jsonData[getIndex]);
  }else{
    res.json({massage: "user not found"});
  }
})

router.post('/',(req,res)=>{
  const readFile = fs.readFileSync(path.join(__dirname,'books.txt'))
  const jsonData = JSON.parse(readFile);

  if(!req.body.id){
    res.json({massage : "Bad request"})
  }else{
    jsonData.push({
      id: req.body.id,
      title: req.body.title,
      ISBN: req.body.ISBN,
      publishedDate: req.body.publishedDate,
      author: req.body.author
    })
      const writeSream = fs.createWriteStream(path.join(__dirname,'books.txt'));
      writeSream.write(JSON.stringify(jsonData))
      writeSream.write('\n');
      writeSream.end();
    res.json({massage:"new book created"})
  }
})

router.put('/:id',(req,res)=>{
  const readFile = fs.readFileSync(path.join(__dirname,'books.txt'))
  const jsonData = JSON.parse(readFile);

  const getIndex = jsonData.map(item=> item.id).indexOf(req.params.id);
  if(getIndex !== -1){
    jsonData[getIndex]={
      id: req.body.id,
      title: req.body.title,
      ISBN: req.body.ISBN,
      publishedDate: req.body.publishedDate,
      author: req.body.author
    }
    const writeSream = fs.createWriteStream(path.join(__dirname,'books.txt'));
      writeSream.write(JSON.stringify(jsonData))
      writeSream.write('\n');
      writeSream.end();
    res.json({status: 'sucess', massage: `Book ID NO ${req.params.id} is Updated"`})
  }else{
    res.json({status:"Sucess", massage: `Book ID NO ${req.params.id} is Not found"`})
  }
})

router.delete('/:id',(req,res)=>{
  const readFile = fs.readFileSync(path.join(__dirname,'books.txt'))
  const jsonData = JSON.parse(readFile);

  const getIndex = jsonData.map(item=> item.id).indexOf(req.params.id);

  if(getIndex !== -1){
    jsonData.splice(getIndex ,1);
    const writeSream = fs.createWriteStream(path.join(__dirname,'books.txt'));
      writeSream.write(JSON.stringify(jsonData))
      writeSream.write('\n');
      writeSream.end();
    res.json({massage: `Book ID ${req.params.id} is Removed`})
  }else{
    res.json({status:"sucess", massage: `Book ID ${req.params.id} is Not found`})
  }
})


module.exports = router;
