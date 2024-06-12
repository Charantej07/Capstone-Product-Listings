const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  u_id: {
    type: Number,
    required: true,
    unique: true,
  },
  u_name: {
    type: String,
    required: true,
  },
  u_email: {
    type: String,
    required: true,
    unique: true,
  },
  u_pwd: {
    type: String,
    required: true,
  },
  u_addr: {
    type: String,
    required: true,
  },
  u_contact: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
