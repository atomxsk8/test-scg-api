const express = require('express');
const validate = require('../../middlewares/validate');
const shopProductValidation = require('../../validations/shopproduct.validation');
const shopProductController = require('../../controllers/shopproduct.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(validate(shopProductValidation.getShopProducts), shopProductController.getShopProducts)
  .post([validate(shopProductValidation.createShopProduct), auth()], shopProductController.createShopProduct)

router
  .route('/:shopProductId')
  .get(validate(shopProductValidation.getShopProduct), shopProductController.getShopProduct)
  .patch([validate(shopProductValidation.updateShopProduct), auth()], shopProductController.updateShopProduct)
  .delete([validate(shopProductValidation.deleteShopProduct), auth()], shopProductController.deleteShopProduct);

router
  .route('/buy/:shopProductId')
  .post([validate(shopProductValidation.buyShopProduct)], shopProductController.buyShopProduct)

module.exports = router;