const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserSchema = new Schema({
  ID: { required: true, type: String, unique: true },
  PW: { required: true, type: String },
  ARD_LIST: [
    {
      type: ObjectId,
      ref: "Arduino",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema, "User");
