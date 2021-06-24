// //!createing Stream  
//const readable = fs.createReadStream("./test.txt",{
//     highWaterMark : 1024  // *config Object
// })// to sent chanks witm 1mg
// //* by defult 65000

//* creating stream 
const readable = fs.createReadStream("./test.txt");
// const writable = fs.createWriteStream('./copy.txt');

 readable.on('data',function(chunk){
    writable.write(chunk)
 })
// or
// readable.pipe(writable)


//! Stream using server 
const fs = require('fs');
  const http = require("http");

   http.createServer((req,res)=>{
    const readStream = fs.createReadStream('./test2.txt');
    readStream.pipe(res)

   }).listen(8080)

//! Strem Copy image reader and writer

const fs = require("fs");
const readable = fs.createReadStream( "b.jpg", { 
  highWaterMark: 16 * 1024,
});
const writable = fs.createWriteStream( "destinationFile.jpg");

// readable.on("data", function (chunk) {
//   console.log(chunk.length);
//   writable.write(chunk);
// });

 // * or easly 
 readable.pipe(writable)