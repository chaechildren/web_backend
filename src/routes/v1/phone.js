const express = require("express");
const Data = require("../../schema/Data");
const router = express.Router();

router.get("/data", async (req, res, next) => {
  const datas = await Data.find({});
  const processed_data = datas.map((data) => ({
    date: splitTime(data.createdAt.toString())._date,
    time: data.createdAt,
    origin: data.createdAt,
    humidity: data.humidity,
  }));
  res.json(processed_data);
});
router.post("/data", async (req, res, next) => {
  const datas = await Data.find({});
  const processed_data = datas.map((data) => ({
    date: splitTime(data.createdAt.toString())._date,
    time: data.createdAt,
    origin: data.createdAt,
    humidity: data.humidity,
  }));
  res.json(processed_data);
});
router.get("/rtdata/asc", async (req, res, next) => {
  try {
    const datas = await Data.find().sort({ createdAt: -1 }).limit(10);
    const processed_data = datas.map((data) => ({
      date: splitTime(data.createdAt.toString())._date,
      time: splitTime(data.createdAt.toString())._time,
      origin: data.createdAt,
      humidity: data.humidity,
    }));
    console.log(typeof processed_data);
    console.log(typeof processed_data[0]);
    res.json(processed_data);
  } catch (err) {
    console.log(err);
  }
});

function splitTime(timeStr) {
  const _date = timeStr.substr(0, 14);
  const _time = timeStr.substr(16, 8);
  return { _date, _time };
}
router.get("/rtdata/desc", async (req, res, next) => {
  try {
    const datas = await Data.find().sort({ createdAt: "desc" }).limit(10);
    const processed_data = datas.map((data) => ({
      date: splitTime(data.createdAt.toString())._date,
      time: splitTime(data.createdAt.toString())._time,
      origin: data.createdAt,
      humidity: data.humidity,
    }));
    console.log(typeof processed_data);
    console.log(typeof processed_data[0]);
    res.json(processed_data);
  } catch (err) {
    console.log(err);
    res.json({ time: "999", humidity: "1234" });
  }
});
router.post("/rtdata/desc", async (req, res, next) => {
  try {
    const datas = await Data.find().sort({ createdAt: "asc" }).limit(10);
    const processed_data = datas.map((data) => ({
      date: splitTime(data.createdAt.toString())._date,
      time: splitTime(data.createdAt.toString())._time,
      origin: data.createdAt,
      humidity: data.humidity,
    }));

    res.json(processed_data);
  } catch (err) {
    console.log(err);
    res.json({ time: "999", humidity: "1234" });
  }
});

module.exports = router;
