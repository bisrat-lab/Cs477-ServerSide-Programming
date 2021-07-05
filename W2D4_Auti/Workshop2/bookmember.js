const fs = require('fs');
const path = require('path')
function bookArray(){
    const readFile = fs.readFileSync(path.join(__dirname,'routes/books.txt'))
    const jsonData = JSON.parse(readFile)
    return jsonData
}
module.exports = bookArray();