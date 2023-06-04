const Router = require('express');
const router = new Router();
const discountController = require('../controllers/discountController');

router.post('/', discountController.create)

router.delete("/", discountController.delete);

module.exports = router;
