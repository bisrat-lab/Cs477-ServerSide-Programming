const fs = require('fs')
const http = require('http');

http.createServer((req,res)=>{
    const read = fs.readFile('./bis.txt',(err,data)=>{
        res.end(data)
    })
}).listen(3002)

