var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, 'users.txt')).toString();
  const lines = data.split('\n');
  const result = [];
  lines.forEach((item) => {
    const attributes = item.split('-');
    const user = {
      id: attributes[0],
      firstname: attributes[1],
      lastname: attributes[2]
    }
    result.push(user)
  })
  res.json({ status: 'success', data: result });
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const data = fs.readFileSync(path.join(__dirname, 'users.txt')).toString();
  const lines = data.split('\n');
  const result = [];
  lines.forEach((item) => {
    const attributes = item.split('-');
    const user = {
      id: attributes[0],
      firstname: attributes[1],
      lastname: attributes[2]
    }
    result.push(user)
  })
  for (let i = 0; i < result.length; i++) {
    if (result[i].id == id) {
      res.json({ status: 'success', data: result[i] });
      return;
    }
  }
  res.json({ status: 'success', data: null });
})

router.post('/', (req, res) => {
  const writeStream = fs.createWriteStream(path.join(__dirname, 'users.txt'),
    { flags: 'a' });
  const user = req.body;
  writeStream.write('\n');
  writeStream.write(user.id + '-' + user.firstname + '-' + user.lastname);
  writeStream.end();
  res.json({ status: 'success' })
})

router.delete('/:id', (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, 'users.txt')).toString();
  const lines = data.split('\n');
  const users = [];
  lines.forEach((item) => {
    const attributes = item.split('-');
    const user = {
      id: attributes[0],
      firstname: attributes[1],
      lastname: attributes[2]
    }
    users.push(user)
  });
  const result = users.filter((item) => {
    return item.id !== req.params.id
  });

  const writeStream = fs.createWriteStream(path.join(__dirname, 'users.txt'));
  result.forEach((item) => {
    writeStream.write(item.id + '-' + item.firstname + '-' + item.lastname);
    writeStream.write('\n');
  })
  writeStream.end();
  res.json({ status: 'success' })

})
 
router.put('/:id', (req, res) => {

})


module.exports = router;
