require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
//DB 연결
const connect = require("./schema");
connect();

//port 설정 || Views설정
app.set("port", process.env.PORT || 4000);
app.set("views", "src/views");
app.set("view engine", "ejs");
console.log(__dirname);

app.use(express.static(path.join(__dirname, "public")));

//middleware 등록
app.use(cors());

app.use(morgan("dev")); //cli로 로그남김
app.use(bodyParser.urlencoded({ extended: true })); // req.body 사용목적
app.use(bodyParser.json());
//router 설정
const homeRouter = require("./routes/home");
const arduinoRouter = require("./routes/arduino");
const phoneRouter = require("./routes/phone");
app.use("/", homeRouter);
app.use("/arduino", arduinoRouter);
app.use("/phone", phoneRouter);

//Server Start
app.listen(app.get("port"), () =>
  console.log(`${app.get("port")} : Port Starts`)
);
