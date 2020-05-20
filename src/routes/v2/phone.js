const express = require("express");
const Data = require("../../schema/Data");
const Arduino = require("../../schema/Arduino");
const User = require("../../schema/User");
const router = express.Router();

function splitTime(timeStr) {
  const _date = timeStr.substr(0, 14);
  const _time = timeStr.substr(16, 8);
  return { _date, _time };
}

//개별 아두이노 데이터에 접근해서 return
router.get("/data/:id", async (req, res, next) => {
  const arduino_id = req.params.id;
  const targetArd = await Arduino.findOne({ ID: arduino_id });
  console.log(targetArd._id);

  const datas = await Data.find({ arduino_id: targetArd._id });
  // console.log(datas);
  const processed_data = datas.map((data) => ({
    date: splitTime(data.createdAt.toString())._date,
    time: data.createdAt,
    origin: data.createdAt,
    humidity: data.humidity,
  }));
  res.json(processed_data);
});

router.post("/connect", async (req, res, next) => {
  const { arduino_id, user_id } = req.body;
  try {
    const _user = await User.findOne({ ID: user_id });
    const _arduino = await Arduino.findOne({ ID: arduino_id });
    console.log(arduino_id, user_id);
    console.log("Alredy ardlist", _user.ARD_LIST);
    await Arduino.update({ ID: arduino_id }, { user: _user._id });
    await User.update(
      { ID: user_id },
      { ARD_LIST: [..._user.ARD_LIST, _arduino._id] }
    );
    res.json({ resultCode: 200, msg: "연결이 성공하였습니다 " });
  } catch (err) {
    console.log("유저 = 아두이노 연결 실패", err);
    res.json({
      resultCode: 300,
      msg: "연동 에러 발생 확인 필요.. POST: phone/connect",
    });
  }
});

module.exports = router;
