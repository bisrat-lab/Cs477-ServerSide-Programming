// const http = require("http");

// http
//   .createServer((req, res) => {
//     
//   })
//   .listen(3000, () => {
//     console.log("listening on 3000");
//   });

//Q2
// const http = require("http");

// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.write("I am learning NodeJS Baby");
//     res.end();
//   })
//   .listen(6000, () => {
//     console.log("listening on 6000");
//   });
  

  //Q3
  const fs = require('fs');
  const http = require("http");

   http.createServer((req,res)=>{
      fs.writeFile('./content.txt','Practicing fs',(err)=>{
          if(err) throw err;
          res.end()
          console.log('Done');
      })
  })
  .listen(7000,()=>{
      console.log('listion on 7000')
  })