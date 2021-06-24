const fs = require("fs");
const readable = fs.createReadStream( "b.jpg", { 
  highWaterMark: 16 * 1024,
});
const writable = fs.createWriteStream( "destinationFile.jpg");

readable.on("data", function (chunk) {
  console.log(chunk.length);
  writable.write(chunk);
});

// * or easly 
readable.pipe(writable)


 
 


