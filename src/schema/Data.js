const mongoose = require("mongoose");

const { Schema } = mongoose;

const DataSchema = new Schema({
  humidty: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Data", DataSchema, "Data");
