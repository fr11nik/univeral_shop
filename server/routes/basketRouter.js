const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");
const authMiddleware = require("../middleware/authMiddleware");
// router.post('/', deviceController.create)
// router.get('/', deviceController.getAll)
// router.get('/:id', deviceController.getOne)
router.get("/current", authMiddleware, basketController.getOne);
router.post("/device", authMiddleware, basketController.create);
router.delete("/device", authMiddleware, basketController.delete);
module.exports = router;
