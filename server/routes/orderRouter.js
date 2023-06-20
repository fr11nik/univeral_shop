const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");
router.post("/", authMiddleware, orderController.create);
router.get("/", authMiddleware, orderController.getOne);
module.exports = router;
