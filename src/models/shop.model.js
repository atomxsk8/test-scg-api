const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

// const productSchema = mongoose.Schema({
//     product: { type : mongoose.SchemaTypes.ObjectId, ref: 'Product' },
//     qty : { type: Number, default: 0, min: [0, `Can't less than 0`], },
// }, { _id : false });

const shopSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        imageUrl: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error('Invalid URL');
                }
            },
        },
        // products: [{ type : mongoose.SchemaTypes.ObjectId, required: true, ref: 'Shop' }],
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
shopSchema.plugin(toJSON);
shopSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The shop's name
 * @param {ObjectId} [excludeShopId] - The id of the shop to be excluded
 * @returns {Promise<boolean>}
 */
shopSchema.statics.isNameTaken = async function (name, excludeShopId) {
    const shop = await this.findOne({ name, _id: { $ne: excludeShopId } });
    return !!shop;
};

/**
 * @typedef Shop
 */
 const Shop = mongoose.model('Shop', shopSchema);

 module.exports = Shop;