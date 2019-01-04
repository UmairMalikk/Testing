const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  token: {
    type: String
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User = mongoose.model("users", UserSchema);
