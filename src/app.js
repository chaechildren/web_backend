require("dotenv").config();
import connect from "./schema";

const express = require("express");
const morgan = require("morgan");

const app = express();
//port 설정
app.set("port", process.env.PORT);

//middleware 등록
app.use(morgan("dev")); //cli로 로그남김

//router 설정
const indexRouter = require("./routes");
app.use("/", indexRouter);
//DB Connect
connect();

//Server Start
app.listen(app.get("port"), () =>
  console.log(`${app.get("port")} : Port Starts`)
);
