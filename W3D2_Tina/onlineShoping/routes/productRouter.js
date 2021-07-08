const express = require('express');
const router = express.Router();
const productControler = require('../controllers/productControllers');
const userController = require('../controllers/userController')

router.get('/',productControler.getAllProduct);
router.get('/:id',productControler.findProductById);
router.post('/',userController.authorizeAdmin, productControler.save);
router.put('/:id',userController.authorizeAdmin, productControler.update);
router.delete('/:id',userController.authorizeAdmin, productControler.deleteById);


module.exports = router;