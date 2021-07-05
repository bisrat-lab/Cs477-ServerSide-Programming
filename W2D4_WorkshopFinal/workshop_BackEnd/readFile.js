const fs = require("fs");
const path = require("path");
const BookModel = require("./booksModel");

function bookFileRead() {
  const readfile = fs
    .readFileSync(path.join(__dirname, "books.txt"))
    .toString();
  const line = readfile.split("\n");
  const booksData = [];
  line.forEach((item) => {
    const attribuit = item.split("-");

    const book = new BookModel(
        attribuit[0],
     attribuit[1],
    attribuit[2],
   attribuit[3],
  attribuit[4]
    );

    booksData.push(book);
  });
  return booksData;
}
module.exports = bookFileRead();
;
