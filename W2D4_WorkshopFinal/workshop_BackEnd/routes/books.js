const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const readBookData = require("../readFile");
const BookModel = require("../model/booksModel");

function bookFileRead() {
  const readfile = fs
    .readFileSync(path.join(__dirname, "../books.txt"))
    .toString();
  const line = readfile.split("\n");
  const booksData = [];
  
  line.forEach((item) => {
    const attribuit = item.split("-");
   
    const book = new BookModel(
      attribuit[0],
      attribuit[1],
      attribuit[2],
      attribuit[3],
      attribuit[4]
    );

    
    booksData.push(book);
  });
  return booksData;
}


router.get("/", (req, res) => {
  const books = bookFileRead();
  res.json({ status: "sucess", data: books });
});

router.get("/:id", (req, res) => {
  const boodIndex = readBookData.map((item) => item.id).indexOf(req.params.id);
  if (boodIndex !== -1) {
    res.json({ status: "sucess", data: readBookData[boodIndex] });
  } else {
    res.json({ status: "sucess", massage: `Book Not found` });
  }
});

router.post("/", (req, res) => {
  const bookIndex = readBookData.map((item) => item.id).indexOf(req.body.id);

  if (bookIndex == -1) {
    const writeSream = fs.createWriteStream(
      path.join(__dirname, "../books.txt"),
      { flags: "a" }
    );
    writeSream.write("\n");
    writeSream.write(
      req.body.id +
        "-" +
        req.body.title +
        "-" +
        req.body.ISBN +
        "-" +
        req.body.publisherDate +
        "-" +
        req.body.author
    );

    writeSream.end();
    res.json({ status: "sucess" });
  } else {
    res.json({ status: "sucess", massage: "id found" });
  }
});

router.put("/:id", (req, res) => {
  const bookIndex = readBookData.map((item) => item.id).indexOf(req.params.id);
  if (bookIndex !== -1) {
    readBookData[bookIndex] = {
      id: req.body.id,
      title: req.body.title,
      ISBN: req.body.ISBN,
      publisherDate: req.body.publisherDate,
      author: req.body.author,
    };
    const writeSream = fs.createWriteStream(path.join(__dirname,'../books.txt'));
    readBookData.forEach((item)=>{
      writeSream.write(item.id+'-'+item.title+"-"+item.ISBN+"-"+item.publisherDate+'-'+item.author)
      writeSream.write('\n');
      })
      writeSream.end();
    res.json({ status: "sucess" });
  }else{
    res.json({status:"sucess", massage: "Book ID Not Found"})
  }
});

router.delete("/:id",(req,res)=>{
  const bookIndex = readBookData.map((item) => item.id).indexOf(req.params.id);
  if(bookIndex !== -1){
    readBookData.splice(bookIndex ,1);
    
    const writeSream = fs.createWriteStream(path.join(__dirname,'../books.txt'));
    readBookData.forEach((item)=>{
      writeSream.write(item.id+'-'+item.title+"-"+item.ISBN+"-"+item.publisherDate+'-'+item.author)
      writeSream.write('\n');
    })
      writeSream.end();
    res.json({status:"sucess",massage: "Book Deleted"})
  }else{
     res.json({status:"sucess",massage:"Book not found"})
  }
})
module.exports = router;


















