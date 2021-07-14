const express = require("express");
const router = express.Router();
const authenticateJWT = require('../middleware/jwt');

const books = [
  {
    id: 1,
    author: "Chinua Achebe",
    title: "Things Fall Apart",
    year: 1958,
    ver: ['v1','v2']
  },
  {
    id: 2,
    author: "Hans Christian Andersen",
    title: "Fairy tales",
    year: 1836,
    ver: ['v5','v2']
  },
  {
    id: 3,
    author: "Dante Alighieri",
    title: "The Divine Comedy",
    year: 1315,
    ver: ['v6','v2']
  },
];

router.get("/",(req,res)=>{
    res.json(books);
})

router.get('/:id',(req,res)=>{
  const currentBook = books.filter(b =>{
    if(b.id == req.params.id){
      return true;
    }
  })
  console.log(currentBook)
  if(currentBook.length === 1){
    res.json(currentBook[0])
  }else{
    res.json({message: "Not Found"});
  }
})

router.post("/",authenticateJWT,(req,res)=>{
    if(req.user.role !== 'admin'){
        res.json({massage: "you are not admin"})
    }else{
        const newID = books[books.length-1].id+1;
        books.push({
          id: newID,
          author: req.body.author,
          title: req.body.title,
          year: req.body.year,
          ver: req.body.ver
        });
        res.json(books)
    }
 
})

router.delete('/:id',(req,res)=>{
  const index = books.map(b=> b.id).indexOf(parseInt(req.params.id))
  console.log(index);
  if(index == -1){
    res.json({massage:"Not Found"})
  }else{
    books.splice(index,1);
    res.json({massage: "Book removed"})
  }
})

router.put('/:id',(req,res)=>{
  const index = books.map(b=> b.id).indexOf(parseInt(req.params.id))
  if(index == -1){//if book not found create new Book
    books.push({
      id: req.params.id,
      author: req.body.author,
      title: req.body.title,
      year: req.body.year
    });
    res.json({books,massage:'new book added'})
  }else{//Update
    books[index] = {
      id: req.params.id,
      author: req.body.author,
      title: req.body.title,
      year: req.body.year
    }
    res.json({books,massage:'book updated'});
  }
})

module.exports = router;
