const jwt = require("jsonwebtoken");
const secret = "123$#%";

function createToken(req, res, next) {
  const { name, password } = req.body;
  const token = jwt.sign({ name: name, password: password }, secret);
  console.log(token);
  res.accessToken = token;
  next();
}

async function auth(req, res, next) {
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    next();
  } catch {
    res.status(401).send("unautorizied");
  }
}

module.exports = { createToken, auth };