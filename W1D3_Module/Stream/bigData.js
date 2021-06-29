const fs  = require('fs')
const http = require('http');

const writeStream = fs.createWriteStream('./bigFile.txt');

for(let i=0; i<= 1e6; i++) {
    writeStream.write('This is a big file trust me\n');
    }
    writeStream.end()

 http.createServer((req,res)=>{
    // fs.readFile('./bigFile.txt', (err, data) => {
    //     if (err) throw err; 
    //     res.end(data);
    //     });
     const readStream = fs.createReadStream('./bigFile.txt',{
         highWaterMark : 1024
     })
     readStream.pipe(res)

 }).listen(3003)



