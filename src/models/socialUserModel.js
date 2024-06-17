const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  facebookId: String,
  displayName: String,
  loginMethod: String, 
});

module.exports = mongoose.model('socialUsers', userSchema);
