const express = require("express");
const router = express.Router();
const Data = require("../../schema/Data");
const Arduino = require("../../schema/Arduino");

// 등록된 Arduino List 연결관계 All Show
router.get("/registered", async (req, res, next) => {
  const registeredArd = await Arduino.find({ user: !null });
  console.log(registeredArd);
  res.json({ ardLIst: registeredArd });
});

//Unregistered Arduino List 다 보내는 것
router.get("/unregistered", async (req, res, next) => {
  //DB에서 데이터 받아와야함
  const unregisteredArd = await Arduino.find({ user: null });
  console.log("unregistered", unregisteredArd);
  res.json({ ardList: unregisteredArd });1
});

//Arduino 등록 router
router.post("/register", async (req, res, next) => {
  //Arduino ID와 UserID Mapping 시키는 작업
  const { id, arduino_Id } = req.body;
  console.log(arduino_Id);
  const newArduino = new Arduino({ ID: arduino_Id, user: null });
  await newArduino.save();
  res.send("<h1>arduino/register </h1>");
});

router.get("/data/:arduinoId", async (req, res, next) => {
  console.log("data Hello");
  const ardId = req.params.arduinoId;
  const specificArduino = await Arduino.findOne({ ID: ardId });
  const arduinoData = await Data.find({ arduino_id: specificArduino._id });
  res.json({ dataList: arduinoData });
});
// 특정 아두이노에서 보내는 데이터를 DB에 저장
router.post("/data/:arduinoId", async (req, res, next) => {
  //:id 의 뜻은 arduino id이다.
  console.log("/data/:arduinoId");
  const ardId = req.params.arduinoId;
  const { id: userID } = req.body; // 유저 아이디 받아와야함
  const arduinoData = await Arduino.findOne({ ID: ardId });
  console.log("Ard data", arduinoData);

  try {
    if ("humidity" in req.body) {
      //Q : UserId 필요없나 ?
      const humidity = req.body.humidity;

      const newData = new Data({
        arduino_id: arduinoData._id,
        humidity: humidity,
      });
      await newData.save();
      console.log("newData", newData);
      res.json(newData);
    } else {
      res.json({ msg: "humidity를 설정해주세요" });
    }
  } catch (err) {
    console.log(err);
    res.json({ msg: "No Arduino ID" });
  }
});

module.exports = router;
