const express = require("express");
const Data = require("../../schema/Data");
const router = express.Router();

function splitTime(timeStr) {
  const _date = timeStr.substr(0, 14);
  const _time = timeStr.substr(16, 8);
  return { _date, _time };
}

//개별 아두이노 데이터에 접근해서 return
router.get("/data/:id", async (req, res, next) => {
  const arduino_id = req.params.id;
  const datas = await Data.find({ arduino_id });
  const processed_data = datas.map((data) => ({
    date: splitTime(data.createdAt.toString())._date,
    time: data.createdAt,
    origin: data.createdAt,
    humidity: data.humidity,
  }));
  res.json(processed_data);
});

module.exports = router;
