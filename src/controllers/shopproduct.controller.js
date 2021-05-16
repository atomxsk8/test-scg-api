const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { shopProductService } = require('../services');
const { queryAllUsers } = require('../services/user.service');
const { sendEmail } = require('../services/email.service');
const { ShopProduct } = require('../models');

const createShopProduct = catchAsync(async (req, res) => {
  const shop = await shopProductService.createShopProduct(req.body);
  res.status(httpStatus.CREATED).send(shop);
});

const getShopProducts = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['shop', 'product']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await shopProductService.queryShopProducts(filter, {...options, populate: 'shop,product'});
    res.send(result);
});

const getShopProduct = catchAsync(async (req, res) => {
    const shop = await shopProductService.getShopProductById(req.params.shopProductId);
    if (!shop) {
      throw new ApiError(httpStatus.NOT_FOUND, 'DVM Product not found');
    }
    res.send(shop);
});

const updateShopProduct = catchAsync(async (req, res) => {
    const shop = await shopProductService.updateShopProductById(req.params.shopProductId, req.body);
    res.send(shop);
  });
  
const deleteShopProduct = catchAsync(async (req, res) => {
    await shopProductService.deleteShopProductById(req.params.shopProductId);
    res.status(httpStatus.NO_CONTENT).send();
});

const buyShopProduct = catchAsync(async (req, res) => {
  const shop = await shopProductService.getShopProductById(req.params.shopProductId);
  const qty = shop.qty - req.body.qty
  if(!shop.qty){
    throw new ApiError(httpStatus.BAD_REQUEST, 'Out of stock!');
  }else if(qty < 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'There are not enough products.');
  }else {

    const newShop = await ShopProduct.findOneAndUpdate(
      { '_id': req.params.shopProductId }, 
      { $inc: { qty: -1 } }
    );

    if(qty < 10) {
      const users = await queryAllUsers()
      const emailUsers = users.map(user => user.email)
      sendEmail({
        from: 'TEST SCG API',               
        to: emailUsers,               
        subject: `แจ้งเตือนสินค้าใกล้หมด`,              
        html: `<b>แจ้งเตือน สินค้า : ${newShop.product.name}, ${newShop.shop.name} คงเหลือ ${qty}</b>`   
      })
    }
    res.send(newShop);
  }
});

module.exports = {
    createShopProduct,
    getShopProducts,
    getShopProduct,
    updateShopProduct,
    deleteShopProduct,
    buyShopProduct
};