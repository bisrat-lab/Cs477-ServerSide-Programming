 const http = require('http');
// const fs = require('fs')
// http.createServer((req,res)=>{
//     fs.readFile('./test2.txt', (err,data)=>{
//         res.end(data)
//     })
// }).listen(8080)

http.createServer((req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>'); res.write('<body><h1>Hello From Node.js</h1></body>');
    res.write('</html>');
    res.end();
}).listen(3030)
