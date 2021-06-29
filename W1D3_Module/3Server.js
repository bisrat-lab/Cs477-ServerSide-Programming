//!Creating Server
const http = require("http");
const server = http.createServer();

//the req => incoming request
//the res => what we are sending back
server.on("request", function (req, res) {
  res.write("my first  wep server");
  res.end();
});
server.listen(3000); //* starting server on port 3000

//! Easy way
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("my first  wep server");
    res.end();
  })
  .listen(3000, () => {
    console.log("Server runing on 3000...");
  }); //* starting server on port 3000

//! readind file using three methods
http
  .createServer((req, res) => {
    //*strem
     const readStream = fs.createReadStream("./users.txt")
     readStream.on('data',function(chunk){
        res.end(chunk)
    })
    //or
    // readStream.pipe(res);
    //*sync
    // const read =fs.readFileSync("./users.txt");
    // res.end(read);

    //*Async
    const readsync = fs.readFile("./users.txt", (err, data) => {
      console.log(data.toString());
      res.end(data);
    });
  })
  .listen(3001);

  //! Writhing file using three methods

  http
  .createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
      res.end("I am learning NodeJS Baby");
    } else if (req.method === "POST" && req.url) {
//*Async
      // fs.writeFile("./content.txt", "Bisrat", (err) => {
      //   if (err) throw err;
      //   console.log("Write Completed");
      //   res.end();
      // });
//*writeFileSync
      // fs.writeFileSync("./content.txt","Practicing fs");
      // res.end("complete")

//*Stream
      const writeStream = fs.createWriteStream("./content.txt");
        writeStream.write("Practicing fs")
        res.end();
    }
  })
  .listen(6000, () => {
    console.log("listening on 6000");
  });