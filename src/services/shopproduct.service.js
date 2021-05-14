const httpStatus = require('http-status');
const { ShopProduct } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a shopProduct
 * @param {Object} shopProductBody
 * @returns {Promise<ShopProduct>}
 */
const createShopProduct = async (shopProductBody) => {
    if (await ShopProduct.isShopTakenItem(shopProductBody)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Shop Product already taken');
    }
    const shopProduct = await ShopProduct.create(shopProductBody);
    return shopProduct;
};

/**
 * Query for shopProducts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryShopProducts = async (filter, options) => {
    const shopProducts = await ShopProduct.paginate(filter, options);
    return shopProducts;
};

/**
 * Get shopProduct by id
 * @param {ObjectId} id
 * @returns {Promise<ShopProduct>}
 */
const getShopProductById = async (id) => {
    return ShopProduct.findById(id).populate('shop product')
};

/**
 * Update shopProduct by id
 * @param {ObjectId} shopProductId
 * @param {Object} updateBody
 * @returns {Promise<ShopProduct>}
 */
const updateShopProductById = async (shopProductId, updateBody) => {
    const shopProduct = await getShopProductById(shopProductId);
    if (!shopProduct) {
      throw new ApiError(httpStatus.NOT_FOUND, 'ShopProduct not found');
    }
    if (await ShopProduct.isShopTakenItem(updateBody, shopProductId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Shop Product already taken');
    }
    Object.assign(shopProduct, updateBody);
    await shopProduct.save();
    return shopProduct;
};

/**
 * Delete shopProduct by id
 * @param {ObjectId} shopProductId
 * @returns {Promise<ShopProduct>}
 */
const deleteShopProductById = async (shopProductId) => {
    const shopProduct = await getShopProductById(shopProductId);
    if (!shopProduct) {
      throw new ApiError(httpStatus.NOT_FOUND, 'ShopProduct not found');
    }
    await shopProduct.remove();
    return shopProduct;
};

module.exports = {
    createShopProduct,
    queryShopProducts,
    getShopProductById,
    updateShopProductById,
    deleteShopProductById,
};