const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  hashPassword: { type: String, required: true },
  salt: { type: String}
})


userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hashPassword === hash;
};

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hashPassword = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.generateJwt = function() {
  return jwt.sign({
    id: this._id, 
    username: this.username,
    issue: 'Rowland',
    exp: 36000,
  }, 'thisIsAhashedPassword')
}
const User = mongoose.model('user', userSchema);

module.exports = User;

