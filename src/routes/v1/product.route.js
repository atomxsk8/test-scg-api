const express = require('express');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(validate(productValidation.getProducts), productController.getProducts)
  .post([validate(productValidation.createProduct), auth()], productController.createProduct)

router
  .route('/:productId')
  .get(validate(productValidation.getProduct), productController.getProduct)
  .patch([validate(productValidation.updateProduct), auth()], productController.updateProduct)
  .delete([validate(productValidation.deleteProduct), auth()], productController.deleteProduct);

module.exports = router;