
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const booksRouter = require('./routes/books');
const bookMembers = require("./bookmember")

const app = express();




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/v1/books', booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));

});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 3001;
app.listen(port,()=> console.log(`Server runing on Port ${port}`));