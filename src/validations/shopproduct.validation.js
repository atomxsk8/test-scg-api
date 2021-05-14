const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createShopProduct = {
  body: Joi.object().keys({
    shop: Joi.string().custom(objectId),
    product: Joi.string().custom(objectId),
    qty: Joi.number().min(0).integer()
  }),
};

const getShopProducts = {
  query: Joi.object().keys({
    shop: Joi.string().custom(objectId),
    product: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getShopProduct = {
  params: Joi.object().keys({
    shopProductId: Joi.string().custom(objectId),
  }),
};

const updateShopProduct = {
  params: Joi.object().keys({
    shopProductId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        shop: Joi.string().custom(objectId),
        product: Joi.string().custom(objectId),
        qty: Joi.number().min(0).required(),
    })
    .min(1),
};

const deleteShopProduct = {
  params: Joi.object().keys({
    shopProductId: Joi.string().custom(objectId),
  }),
};

const buyShopProduct = {
  params: Joi.object().keys({
    shopProductId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        qty: Joi.number().min(1).required(),
  })
};

module.exports = {
  createShopProduct,
  getShopProducts,
  getShopProduct,
  updateShopProduct,
  deleteShopProduct,
  buyShopProduct
};