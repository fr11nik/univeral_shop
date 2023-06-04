const Router = require("express");
const router = new Router();
const deviceRouter = require("./deviceRouter");
const userRouter = require("./userRouter");
const brandRouter = require("./brandRouter");
const typeRouter = require("./typeRouter");
const basketRouter = require("./basketRouter");
const addressRouter = require("./addressRouter");
const personalInfoRouter = require("./personalInfoRouter");
router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);
router.use("/basket", basketRouter);
router.use("/address", addressRouter);
router.use("/personalInfo", personalInfoRouter);

module.exports = router;
