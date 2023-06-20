const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const stripeController = require("../controllers/stripeController");
router.post("/create-payment-intent", authMiddleware, stripeController.create);

module.exports = router;
