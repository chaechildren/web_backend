const express = require("express");
const Data = require("../schema/Data");
const router = express.Router();

router.get("/data", async (req, res, next) => {
  const datas = await Data.find({});
  res.json(datas);
});

// request로 들어온 데이터를 파싱해서 DB에 저장
router.post("/data", async (req, res, next) => {
  console.log(req.body);
  if ("humidity" in req.body) {
    const humidity = req.body.humidity;

    const newData = new Data({ humidity: req.body.humidity });
    await newData.save();
    console.log("newData", newData);
    res.json(newData);
  } else {
    res.json({ msg: "humidity를 설정해주세요" });
  }
});

module.exports = router;
