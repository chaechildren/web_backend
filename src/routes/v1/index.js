const express = require("express");
const Data = require("../../schema/Data");
const router = express.Router();
router.get("/", (req, res) => {
  res.json({ id: 1, content: "Hi" });
});
router.get("/data", async (req, res) => {
  const datas = await Data.find({}).sort({ date: -1 });
  res.json(datas);
});
router.post("/data", async (req, res) => {
  const data = req.params;
  console.log(data);

  res.json({ id: "1", result: "works" });
});

module.exports = router;
