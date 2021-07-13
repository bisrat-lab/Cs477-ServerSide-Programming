const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const productRoute = require('./routes/productRouter')
const authRoute = require('./routes/authRouter');
const mongoConnect = require('./utils/database').mongoConnect;

const app = express();

//!middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//!router
app.use(authRoute);
app.use("/products", productRoute);

//! error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.json({ status: "error" });
});

const port = process.env.PORT || 3004;
mongoConnect(()=>{
  app.listen(port, () => console.log(`Your server runing On ${port}`));
})

