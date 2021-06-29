////!fs module
//*to access and interact with the file system.
//*there are two of reading and writing file ways synchronously  of asynchronously 

// * Reading from file sync //it might block V8
const fs = require("fs");
const data1 = fs.readFileSync("./test.txt");
console.log(data1.toString());

// * Reading from file async NON-Bloking we will not block v8
fs.readFile("./test.txt", function (err, data) {
  console.log(`async ${data.toString()}`);
});
//
fs.readFile(
  path.join(__dirname, "test.txt"),
  { encoding: "utf8" },
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);

// //!write File

fs.writeFileSync("./content.txt", "Practicing fs");

fs.writeFile("./test.txt", "My Love", function (err) {
  if (err) throw err;
  console.log("Done");
});

fs.writeFile("student.txt", "your text here", (err) => {
  if (err) throw err;
  console.log("Done");
});