// var express = require('express');
// var router = express.Router();
// const fs = require('fs');
// const path = require('path')

// //localhost:3000/user/search
// //const users = [{id:1,firstname:'John',lastname: 'Doe'}]

// //!Retrive all
// router.get('/', function(req, res) {
//   const data = fs.readFileSync(path.join(__dirname,'users.txt')).toString();
//   console.log(data);
//   const result =[];
//   const line = data.split('\n');
//   line.forEach(item => {
//    const atribuit = item.split('-');
//   const  user ={
//     id: atribuit[0],
//     firstname: atribuit[1],
//     lastname: atribuit[2]
//   }
//   result.push(user)
//  }) 
//  console.log(result)
//   res.json(result);
// });


// router.get('/topTen', function(req, res) {
  
// });

// //!Retrive spicific id
// router.get('/:id', function(req, res) {
  
// });

// // !Create
// router.post('/', function(req, res) {
//   const getIndex = users.map(user=>user.id)
//                 .indexOf(parseInt(req.params.id))

//   if(!req.body.firstname || !req.body.lastname){
//     res.status(400).json({massage: "Bad Request"})
//   }else{
//      let newId = users[users.length -1].id+1
//     users.push({
//       id: newId,
//       firstname : req.body.firstname,
//       lastname : req.body.lastname
//     })
//     res.json(users)
//   }
// });

// // !Remove data in id
// router.delete('/:id', function(req, res) {
//   let getIndex = users.map(user=>user.id)
//         .indexOf(parseInt(req.params.id));
//     console.log(getIndex) ; 
//     if(getIndex === -1){
//       res.json({massage: "User Not Found"})
//     }else{
//       users.splice(getIndex, 1);
//       res.send({massage: "User ID " + req.params.id + " Removed"});
//     }
// });

// // !Update data in id
// router.put('/:id', function(req, res) {
//   if(!req.body.firstname || !req.body.lastname){
//     res.status(400).json({massage: "Bad Request"})
//   }else{
//     let getIndex = users.map(user=>user.id)
//             .indexOf(parseInt(req.params.id));
//        console.log(getIndex) ;     
//     if(getIndex === -1){
//       let newId = parseInt(req.params.id)
//       users.push({
//         id: newId,
//         firstname : req.body.firstname,
//         lastname : req.body.lastname
//       })
//       res.json({massage: "New user added"})
//     }
//     else{
//       let newId = parseInt(req.params.id)
//       users[getIndex] = {
//         id: newId,
//         firstname : req.body.firstname,
//         lastname : req.body.lastname
//       }
//       res.json({massage: "Movie id" + req.params.id + " updated"});
//     }
//   } 
// });
// module.exports = router;

