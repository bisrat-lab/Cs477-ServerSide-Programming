//!importing 
 const a = require('./myMod'); // *a is an object

// a.sayHello();
// a.sayHi();
a.play()
// //! Creating Buffer 
const buf = Buffer.from('BISRAT');//* create buffer 
console.log(buf[0]);
console.log(buf.toString()); 
console.log(buf.length);
for (const item of buf) {
    console.log(item); 
}//66 73 83 82 65 84

// //! Creating path 
const path = require('path');
//used for both mac and win version 
//fs.readFile(path.join('./','test.txt')) 


////!fs module
//*to access and interact with the file system.
//*there are two ways sync of asyn 

// * Reading from file sync //it might block V8
const fs = require('fs');
const data1 = fs.readFileSync("./test.txt")
console.log(data1.toString())

// * Reading from file async 
 fs.readFile("./test.txt", function(err, data){
    console.log(`async ${data.toString()}`)
})

// //!write File 
fs.writeFile("./test.txt","My Love",function(err){
        if(err) throw err;
        console.log('Done')
 })

// //!createing Stream  
//const readable = fs.createReadStream("./test.txt",{
//     highWaterMark : 1024  // *config Object
// })// to sent chanks witm 1mg
// //* by defult 65000

//* creating stream 
const readable1 = fs.createReadStream("./test.txt");
// const writable = fs.createWriteStream('./copy.txt');

 readable.on('data',function(chunk){
    writable.write(chunk)
 })

// readable.pipe(writable)


//!Creating Server
 const http = require('http');
 const server = http.createServer();

server.on('request', function(req,res){
    res.writeHead(200,{'Content-Type': 'text/plain'})
    res.write('my first  wep server');
    res.end();
 });

 server.listen(3000)//* starting server on port 3000