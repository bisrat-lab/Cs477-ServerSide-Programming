var express = require("express");
const authenticateJWT = require('./middleware/jwt');
const loginRoute = require('./routes/login')
const bookRoute = require('./routes/books');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/login',loginRoute);
app.use('/books',bookRoute);

app.use(function (err, req, res, next) {
  res.json(err);
});

app.listen(4000);
