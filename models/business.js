const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const businessSchema = mongoose.Schema({
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
  licenseNum: {
    type: String,
    required: true,
  },
});

const business1 = mongoose.model("business", businessSchema);

business1.getUserById = function (id, callback) {
  business1.findById(id, callback);
};

business1.getUserByUsername = function (username, callback) {
  const query = { username: username };
  business1.findOne(query, callback);
};

business1.getUserByLicense = function (licenseNum, callback) {
  const query = { licenseNum: licenseNum };
  business1.findOne(query, callback);
};

business1.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

business1.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

business1.getAll = function (callback) {
  business1.find(callback);
};

module.exports = business1;
