const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema(
    {
        sku: {
            type: Number,
            required: true,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: mongoose.Types.Decimal128,
            required: true,
            trim: true,
        },
        upc: {
            type: String,
            required: true,
            trim: true,
        },
        category: [
            {
                id: String,
                name: String,
            },
        ],
        shipping: {
            type: mongoose.Types.Decimal128,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        manufacturer: {
            type: String,
            required: false,
            trim: true,
        },
        model: {
            type: String,
            required: true,
            trim: true,
        },
        url: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error('url parameter is invalid');
                }
            },
        },
        image: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error('image parameter is invalid');
                }
            },
        },
        // owner: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: 'User',
        // },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
