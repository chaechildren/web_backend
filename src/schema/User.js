const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  ID: { required: true, type: String, unique: true },
  PW: { required: true, type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema, "User");
