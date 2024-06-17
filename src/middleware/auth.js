const jwt = require("jsonwebtoken");
const secterKey = require("../utils/secretKey");

const userAuthentication = async (req,res, next) => {
  const token = req.headers.authorization
  if (!token) {
    res.send("Authentication failed") 
  } else {
    try {
      jwt.verify(token, secterKey);
      await next();
    } catch (error) {
      res.status(500).send({message:"Authentication failed"})
    }
  }
};

module.exports = userAuthentication;
