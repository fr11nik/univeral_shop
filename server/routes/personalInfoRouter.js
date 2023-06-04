const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const personalInfoController = require("../controllers/personalInfoController");
router.get("/current", authMiddleware, personalInfoController.getOne);
router.post("/", authMiddleware, personalInfoController.create);
router.delete("/", authMiddleware, personalInfoController.delete);
router.put("/", authMiddleware, personalInfoController.update);
module.exports = router;
