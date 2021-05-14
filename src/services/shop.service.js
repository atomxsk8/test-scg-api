const httpStatus = require('http-status');
const { Shop } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a shop
 * @param {Object} shopBody
 * @returns {Promise<Shop>}
 */
const createShop = async (shopBody) => {
    if (await Shop.isNameTaken(shopBody.name)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
    }
    const shop = await Shop.create(shopBody);
    return shop;
};

/**
 * Query for shops
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryShops = async (filter, options) => {
    const shops = await Shop.paginate(filter, options);
    return shops;
};

/**
 * Get shop by id
 * @param {ObjectId} id
 * @returns {Promise<Shop>}
 */
const getShopById = async (id) => {
    return Shop.findById(id).populate('products');
};

/**
 * Update shop by id
 * @param {ObjectId} shopId
 * @param {Object} updateBody
 * @returns {Promise<Shop>}
 */
const updateShopById = async (shopId, updateBody) => {
    const shop = await getShopById(shopId);
    if (!shop) {
      throw new ApiError(httpStatus.NOT_FOUND, 'DVM not found');
    }
    if (updateBody.name && (await Shop.isNameTaken(updateBody.name, shopId))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
    }
    Object.assign(shop, updateBody);
    await shop.save();
    return shop;
};

/**
 * Delete shop by id
 * @param {ObjectId} shopId
 * @returns {Promise<Shop>}
 */
const deleteShopById = async (shopId) => {
    const shop = await getShopById(shopId);
    if (!shop) {
      throw new ApiError(httpStatus.NOT_FOUND, 'DVM not found');
    }
    await shop.remove();
    return shop;
};

module.exports = {
    createShop,
    queryShops,
    getShopById,
    updateShopById,
    deleteShopById,
};