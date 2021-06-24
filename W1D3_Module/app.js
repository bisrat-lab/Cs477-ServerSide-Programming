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

// * Reading from file async NON-Bloking we will not block v8
 fs.readFile("./test.txt", function(err, data){
    console.log(`async ${data.toString()}`)
})
//
fs.readFile(path.join(__dirname,"test.txt"),{encoding: 'utf8'},(err,data)=>{
    if(err) throw err;
    console.log(data)
})

// //!write File 
fs.writeFile("./test.txt","My Love",function(err){
        if(err) throw err;
        console.log('Done')
 })

 fs.writeFile('student.txt','your text here',(err)=>{
    if(err) throw err;
    console.log('Done')
 })



//!Creating Server
 const http = require('http');
 const server = http.createServer();

 //the req => incoming request  
 //the res => what we are sending back
server.on('request', function(req,res){
    res.writeHead(200,{'Content-Type': 'text/plain'})
    res.write('my first  wep server');
    res.end(); 
 });
 server.listen(3000)//* starting server on port 3000

 //! Easy way 
 http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type': 'text/plain'})
    res.write('my first  wep server');
    res.end();
 })
 .listen(3000, ()=>{
     console.log('Server runing on 3000...')
 })//* starting server on port 3000



 