
// //! Creating Buffer
const buf = Buffer.from("BISRAT"); //* create buffer
console.log(buf[0]); //72
console.log(buf.toString());
console.log(buf.length);
for (const item of buf) {
  console.log(item);
} //66 73 83 82 65 84

// //! Creating path
const path = require("path");
//used for both mac and win version
//fs.readFile(path.join('./','test.txt'))



