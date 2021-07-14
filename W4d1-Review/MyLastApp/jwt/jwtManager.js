const jwt = require("jsonwebtoken");

const secret = "top-secret";

class JwtManager {
  genreate(data) {
    const token = jwt.sign(data, secret);
    return token;
  }
  verify(token) {
    try {
      const data = jwt.verify(token, secret);

      return data;
    } catch (error) {}
  }
}
module.exports = JwtManager;
