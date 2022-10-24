const express = require('express');
const router = new express.Router();
const { findDuplicateTransactions } = require('../services/transaction');
const { createWebhookSubscription, generateAppAccessToken } = require('../services/messenger');

router.post('/playground', async (req, res) => {
    const accessToken = process.env.FB_PAGE_ACCESS_TOKEN;
    const pageId = process.env.FB_PAGE_ID;
    const appSecret = process.env.FB_APP_SECRET;
    const appId = process.env.FB_APP_ID;

    let body = req.body;
    try {
        if (body.key) {
            await generateAppAccessToken(appId, appSecret, accessToken);
            await createWebhookSubscription(appId, appSecret);
        }

        if (body) {
            const result = findDuplicateTransactions(body);
            res.json({ result });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

module.exports = router;
