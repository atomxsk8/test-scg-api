const express = require('express');
const validate = require('../../middlewares/validate');
const shopValidation = require('../../validations/shop.validation');
const shopController = require('../../controllers/shop.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(validate(shopValidation.getShops), shopController.getShops)
  .post([validate(shopValidation.createShop), auth()], shopController.createShop)

router
  .route('/:shopId')
  .get(validate(shopValidation.getShop), shopController.getShop)
  .patch([validate(shopValidation.updateShop), auth()], shopController.updateShop)
  .delete([validate(shopValidation.deleteShop), auth()], shopController.deleteShop);

module.exports = router;