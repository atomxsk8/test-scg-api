const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
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
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The product's name
 * @param {ObjectId} [excludeProductId] - The id of the product to be excluded
 * @returns {Promise<boolean>}
 */
productSchema.statics.isNameTaken = async function (name, excludeProductId) {
    const product = await this.findOne({ name, _id: { $ne: excludeProductId } });
    return !!product;
};

/**
 * @typedef Product
 */
 const Product = mongoose.model('Product', productSchema);

 module.exports = Product;