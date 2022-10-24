const express = require('express');
const router = new express.Router();
const Product = require('../models/product');

router.post('/products', async (req, res) => {
    let products = req.body;
    // Check if products exists
    if (products && Array.isArray(products)) {
        try {
            let product = await Product.insertMany(products);
            res.status(201).send(product);
        } catch (err) {
            let error = {
                code: err.code,
                message: err.message,
                stack: err.stack,
            };
            res.status(400).send(error);
        }
    }
});

router.get('/products/:id', async (req, res) => {
    const sku = req.params.sku;
    try {
        const product = await Product.findOne({ sku });

        if (!product) {
            res.status(404).send();
        }

        res.send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
