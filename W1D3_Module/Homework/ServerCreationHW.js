const http = require("http");
const fs = require('fs')
//!Q1 Create http server at 3000


// http
//   .createServer((req, res) => {

//   })
//   .listen(3000, () => {
//     console.log("listening on 3000...");
//   });

//!Q2 and Q3 Create http server

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

