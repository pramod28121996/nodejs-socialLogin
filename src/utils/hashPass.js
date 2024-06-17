const bcrypt = require("bcrypt");
 const bcryptPassword = async (password) => {
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
     return hashedPassword;
 }

 const comparePassword = async (password, hashedPassword) => {
     return await bcrypt.compare(password, hashedPassword);
 }

 module.exports = {bcryptPassword, comparePassword}