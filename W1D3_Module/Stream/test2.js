const http = require("http");
const fs = require("fs");
const path = require('path')
 
http
  .createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
      res.end("I am learning Node JS");
    } else if (req.method === "POST" && req.url === "/") {
      const writable = fs.createWriteStream(path.join(__dirname,'content.txt'));
      writable.write('Hellodd')
      res.end();

    }
  })
  .listen(3005);