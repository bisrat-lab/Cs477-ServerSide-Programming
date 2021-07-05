const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bookRouter = require("./routes/books");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/books", bookRouter);

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.json({ status: "error" });
});
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Your server runing On ${port}`));
