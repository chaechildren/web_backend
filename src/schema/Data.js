const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const DataSchema = new Schema({
  humidity: String,
  arduino_id: {
    type: ObjectId,
    ref: "Arduino",
  },
  humi: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Data", DataSchema, "Data");
