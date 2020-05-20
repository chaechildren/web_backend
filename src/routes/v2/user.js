const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../schema/User");

router.get("/", async (req, res, next) => {
  const allUser = await User.find({});
  res.json({ userList: allUser });
});
router.post("/login", async (req, res, next) => {
  // console.log(req);

  console.log(req.body);
  const { ID, PW } = req.body;
  try {
    const exUser = await User.findOne({ ID });
    if (exUser) {
      const isCorrectPassword = await bcrypt.compare(PW, exUser.PW); // bcrypt 암호화 결과 비교
      if (isCorrectPassword) {
        //비밀번호 일치
        res.json({
          resultCode: 200,
          msg: "로그인에 성공하였습니다",
          email: ID,
          arduino: null,
        });
      } else {
        res.json({ resultCode: 301, msg: "비밀번호가 일치하지 않습니다" });
      }
    } else {
      res.json({ resultCode: 300, msg: "아이디가 존재하지 않습니다" });
    }
  } catch (err) {
    console.log(err);
    res.json({ resultCode: 400, msg: "로그인 오류... 네트워크 & DB 오류" });
  }
});

router.post("/register", async (req, res, next) => {
  const { ID, PW, CONFIRMPW } = req.body;
  //
  if (ID.length === 0 || PW.length === 0 || CONFIRMPW.length === 0) {
    res.json({ resultCode: 300, msg: "empty parameter sent " });
  }
  if (PW.length < 4) {
    res.json({
      resultCode: 302,
      msg: "회원가입 실패 , 비밀번호가 너무 짧습니다",
    });
  }
  try {
    if (PW === CONFIRMPW) {
      const hashPW = await bcrypt.hash(PW, 12);
      await User.create({
        ID: ID,
        PW: hashPW,
      });
      res.json({ resultCode: 200, msg: "회원가입 성공", email: ID });
    } else {
      //비밀번호가 서로 다른경우
      res.json({
        resultCode: 301,
        msg: "회원가입 실패 , 전송된 비밀번호가 서로 다릅니다",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ resultCode: 300, msg: "회원가입 실패" });
  }
  res.json({ resultCode: 310, msg: "이건 생기면안됨" });
});

module.exports = router;
