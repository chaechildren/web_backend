require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
//DB  연결
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
<<<<<<< HEAD
const homeRouter = require("./routes/v1/home");
const arduinoRouter = require("./routes/v1/arduino");
const phoneRouter = require("./routes/v1/phone");
app.use("/", homeRouter);
app.use("/arduino", arduinoRouter);
app.use("/phone", phoneRouter);

//router v2 설정
const v2Router = require("./routes/v2");
app.use("/v2", v2Router);
=======
const homeRouter = require("./routes/home");
const arduinoRouter = require("./routes/arduino");
const phoneRouter = require("./routes/phone");
app.use("/", homeRouter);
app.use("/arduino", arduinoRouter);
app.use("/phone", phoneRouter);
>>>>>>> origin/master

//Server Start
app.listen(app.get("port"), () =>
  console.log(`${app.get("port")} : Port Starts`)
);
