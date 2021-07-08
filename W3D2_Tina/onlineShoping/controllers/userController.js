const User = require("../model/user");
const jwt = require("jsonwebtoken");
const secret = "top-secret";

exports.login = (req, res) => {
  const user = new User(req.body.username, req.body.password, null).login();
  if (user) {
    //generate token
    const jwtToken = jwt.sign(
      { username: user.username, role: user.role },
      secret
    );
    res.json({ jwtToken });
  } else {
    res.json({ error: "Invilid Username and password" });
  }
};

exports.authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const jwtToken = authHeader.split(" ")[1];
    try {
      const payload = jwt.verify(jwtToken, secret);
      req.user = payload;
      next();
    } catch (error) {
      res.status(403).json({ error: "Forbiden" });
    }

    // jwt.verify(jwtToken, secret, (err, payload)=>{
    //     if(err){
    //         res.status(403).json({error: 'Unauterized'})
    //     }else{
    //          console.log(payload)
    //          if(payload.role === 'admin'){
    //     next();
    // }else{
    //     res.status(403).json({error: 'Forbiden'})
    // }
    //         next();
    //     }
    // });
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};

exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ error: "Forbiden" });
  }
};
