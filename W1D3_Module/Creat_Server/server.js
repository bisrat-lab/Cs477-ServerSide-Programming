//!Creating Server
// const http = require('http');
// const server = http.createServer();

// server.on('request', function(req,res){
//    res.writeHead(200,{'Content-Type': 'text/plain'})
//    res.write('my first  wep server');
//    res.end();
// });

// server.listen(4000)//* starting server on port 3000

// const http = require("http");
// const server = http.createServer(function (req, res) {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.write("my first  wep server");
//   res.end();
// });

// server.listen(4000); //* starting server on port 3000

//!Send out an HTML file
const http = require("http");
const fs = require("fs");
const path = require("path");
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    // let html = fs.readFileSync('index.html');
    // let html2 = html.toString()

    html = html.replace("{Message}", "Hello from Node.js class!");
    res.end(html);
  })
  .listen(5000, () => {
    console.log("listening on 5000...");
  });
