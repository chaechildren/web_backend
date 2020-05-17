const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const arduinoRouter = require("./arduino");
const phoneRouter = require("./phone");

router.use("/user", userRouter);
router.use("/arduino", arduinoRouter);
router.use("/phone", phoneRouter);

module.exports = router;
