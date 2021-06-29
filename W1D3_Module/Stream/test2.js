const http = require("http");
const server = http.createServer();
const fs = require('fs')


http
  .createServer((req, res) => {
    //*strem
     const readStream = fs.createReadStream("./bis.txt")
     readStream.on('data',function(chunk){
         console.log(chunk)
        res.end(chunk)
    })
  })
  .listen(3005);