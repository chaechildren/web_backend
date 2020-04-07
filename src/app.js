require("dotenv").config();
import connect from "./schema";
const Data = require("./schema/Data");
const express = require("express");
const morgan = require("morgan");

const app = express();
//port 설정
app.set("port", process.env.PORT);

//middleware 등록
app.use(morgan("dev")); //cli로 로그남김

//router 설정
const router = express.Router();
router.get("/", (req, res) => {
  res.json({ id: 1, content: "Hi" });
});
router.get("/data", async (req, res) => {
  const datas = await Data.find({});
  res.json(datas);
});
app.use("/", router);
//DB Connect
connect();

//Server Start
app.listen(app.get("port"), () =>
  console.log(`${app.get("port")} : Port Starts`)
);
