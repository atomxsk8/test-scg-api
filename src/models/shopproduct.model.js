const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const shopProductSchema = mongoose.Schema(
    {
        shop: { type : mongoose.SchemaTypes.ObjectId, required: true, ref: 'Shop' },
        product: { type : mongoose.SchemaTypes.ObjectId, required: true, ref: 'Product' },
        qty : { type: Number, default: 0, min: [0, `Can't less than 0`], }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
shopProductSchema.plugin(toJSON);
shopProductSchema.plugin(paginate);

shopProductSchema.statics.isShopTakenItem = async function (body, excludeShopId) {
    const shopProduct = await this.findOne({ shop: body.shop, product: body.product , _id: { $ne: excludeShopId } });
    return !!shopProduct;
};

/**
 * @typedef Shop
 */
 const ShopProduct = mongoose.model('ShopProduct', shopProductSchema);

 module.exports = ShopProduct;