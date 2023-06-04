const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const addressController = require("../controllers/addressController");
router.get("/current", authMiddleware, addressController.getOne);
router.post("/", authMiddleware, addressController.create);
router.delete("/", authMiddleware, addressController.delete);
router.put("/", authMiddleware, addressController.update);
module.exports = router;
