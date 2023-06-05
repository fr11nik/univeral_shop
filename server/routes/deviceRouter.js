const Router = require("express");
const router = new Router();
const deviceController = require("../controllers/deviceController");
router.get("/without-discount", deviceController.getDevicesWithoutDiscount);
router.get("/with-discount", deviceController.getDevicesWithDiscount);
router.post("/", deviceController.create);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);

module.exports = router;
