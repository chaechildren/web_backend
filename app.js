require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
//DB  연결
const connect = require("./src/schema");
connect();

const cookieParser = require("cookie-parser"); //모듈설치
const session = require("express-session"); //모듈 설치
const pgSession = require("connect-pg-simple")(session); //모듈 설치
const pgPool = require("./src/Connect/getPoolDB"); //connection pool
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
//admin용 쿠키, 세션
app.use(cookieParser());
app.use(
  session({
    store: new pgSession({
      pool: pgPool,
      tableName: "admin_session",
    }),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, //30 days
  })
);

//router admin 설정
const adminRouter = require("./src/routes/admin");
app.use("/admin", adminRouter);

//router v1 설정
const homeRouter = require("./src/routes/v1/home");
const arduinoRouter = require("./src/routes/v1/arduino");
const phoneRouter = require("./src/routes/v1/phone");
app.use("/", homeRouter);
app.use("/arduino", arduinoRouter);
app.use("/phone", phoneRouter);

//router v2 설정
const v2Router = require("./src/routes/v2");
app.use("/v2", v2Router);

//Server Start
app.listen(app.get("port"), () =>
  console.log(`${app.get("port")} : Port Starts`)
);
