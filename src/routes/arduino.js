const express = require("express");
const Data = require("../schema/Data");
const router = express.Router();

router.get("/data", async (req, res, next) => {
  const datas = await Data.find({});
  res.json(datas);
});

router.post("/data", async (req, res, next) => {
  // 구현해야함
});
module.exports = router;
