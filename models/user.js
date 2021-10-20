const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: 1,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  birth: {
    type: String,
    required: true,
  },
});

const User1 = mongoose.model("User", UserSchema);

User1.getUserById = function (id, callback) {
  User1.findById(id, callback);
};

User1.getAll = function (callback) {
  User1.find(callback);
};

module.exports = User1;
