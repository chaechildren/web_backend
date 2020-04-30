const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.render("home", { test: "It works" });
});

router.post("/login", async (req, res, next) => {
  // console.log(req);
  const constantUser = { ID: "abc", PW: "abc" };
  console.log(req.body);
  const { ID, PW } = req.body;
  const obj = {};

  if (constantUser.ID === ID && constantUser.PW === PW) {
    obj.resultCode = 200;
    obj.msg = "로그인에 성공하였습니다";
    obj.email = ID;
    res.json(obj);
  } else {
    obj.resultCode = 300;
    obj.msg = "아이디가 존재하지 않습니다";
    obj.email = "no email";
    res.json(obj);
  }
});
module.exports = router;
