const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ArduinoSchema = new Schema({
  ID: { required: true, type: String, unique: true },
  user: {
    type: ObjectId,
    ref: "User",
  },
  limitUpper: String,
  limitLower: String,
  temp: String,
});

module.exports = mongoose.model("Arduino", ArduinoSchema, "Arduino");
