const express = require("express");

const User = require("../schema/User");
const router = express.Router();
router.get("/", async (req, res, next) => {
  res.render("home", { test: "It works" });
});

router.post("/login", async (req, res, next) => {
  // console.log(req);

  console.log(req.body);
  const { ID, PW } = req.body;
  try {
    const exUser = await User.findOne({ ID });
    if (exUser) {
      if (exUser.PW === PW) {
        //비밀번호 일치
        res.json({
          resultCode: 200,
          msg: "로그인에 성공하였습니다",
          email: ID,
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

module.exports = router;
