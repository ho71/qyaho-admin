const mongoose = require('mongoose');

const CusNumSchema = mongoose.Schema({
  name: {
    type: String,
  },
  birth: {
    type: String,
  },
  time: {
    type: Number,
  },
  username: {
    type: String,
  },
});
  

  module.exports = mongoose.model("Cus_num", CusNumSchema);