// Require api service file
const Product = require('../models/product');
const API = require('./api');
const { sendProductOrderEmail } = require('../emails/account');

const handleIncomingMessage = async (senderId, content) => {
    // define response
    let response;

    // Check if the message contains text
    if (content.text) {
        // define text
        let text = content.text;

        // Check if text contains slash
        if (text.includes('/', 0)) {
            response = await prepareQueryResponse(text);
        } else {
            response = grettingMessage(text);
        }

        // Check if response
        if (response) {
            // Sends the response message
            sendResponseMessage(senderId, response);
        }
    }
};

prepareQueryResponse = async (text) => {
    let _return = {};
    // Check if text
    if (text) {
        // get the product id
        let queryData = text.split(' ').reverse();

        if (queryData.length > 0) {
            const [sku, query] = queryData;
            const product = await Product.findOne({ sku: Number(sku) });

            if (!product) {
                _return.text = 'Product out of sock. Please try again.';
                return _return;
            }

            let response;
            if (query === '/desc') {
                response = product.description;
            } else if (query === '/price') {
                response = parseFloat(product.price);
            } else if (query === '/shipping') {
                response = parseFloat(product.shipping);
            } else if (query === '/buy') {
                try {
                    sendProductOrderEmail(process.env.TO_EMAIL, product);

                    response = 'We are processing your order, thank you.';
                } catch (err) {
                    console.log(`Coundn't sent email`, err);
                }
            } else {
                response = 'Invalid query. Please try again.';
            }
            _return.text = response;
            return _return;
        }
    }
};

grettingMessage = (text) => {
    let _return = {};
    // Create the payload for a basic text message
    if (text) {
        let response;
        if (text === 'Hi') {
            response = `How are you?`;
        } else if (text === 'Hello') {
            response = `I hope you're doing well.`;
        } else if (text === 'Good morning') {
            response = `I hope you're having a great day.`;
        } else {
            response = `You sent the message: "${text}"!`;
        }
        // Add text to _return
        _return.text = response;

        return _return;
    }
};

// Sends response messages via the Send API
const sendResponseMessage = async (sender_psid, response) => {
    // Create API handler
    const api = new API({
        external: false,
        apiCred: {
            base_url: process.env.FB_BASE_URL,
        },
    });

    // create apiData object
    let apiData = {
        recipient: {
            id: sender_psid,
        },
        message: response,
        access_token: process.env.FB_PAGE_ACCESS_TOKEN,
    };

    // Define apiError
    let apiError;

    // Send a POST reuest to endpoint using page access token.
    let api_response = await api.post('/me/messages', apiData).catch((err) => (apiError = err));

    // Check if API success
    if (!apiError && api_response && api_response.success) {
        console.log('Message sent!');
    } else {
        console.log('Could not send the message', apiError.data.response.data.error.message);
    }
};

// Set up webhook callback url, only need to be called once the created the FB APP
// create webhook subscriptions for the FB app programmatically
createWebhookSubscription = async (appId, appSecret) => {
    if (appId && appSecret) {
        // Create API handler
        const api = new API({
            external: false,
            apiCred: {
                base_url: process.env.FB_BASE_URL,
            },
        });

        // create apiData object
        let apiData = {
            object: 'page',
            callback_url: process.env.FB_VERIFY_TOKEN,
            fields: 'pages_messaging, about',
            include_values: true,
            verify_token: process.env.FB_VERIFY_TOKEN,
            access_token: process.env.FB_APP_ACCESS_TOKEN,
        };

        // Initialize apiError
        let apiError;
        let apiResponse = await api
            .post(`/${appId}/subscriptions`, apiData)
            .catch((err) => (apiError = err));

        let _return = { success: false };
        // Check if API success
        if (!apiError && apiResponse && apiResponse.success) {
            if (apiResponse.data) {
                _return.success = true;
                _return.data = apiResponse.data;
            }
            return apiResponse.data;
        } else {
            console.error(apiError);
            _return.error = 'Failed to subscribe webhook.';
        }

        return _return;
    }
};

// Generate App Access Token
generateAppAccessToken = async (appId, appSecret, accessToken) => {
    // Define baseurl
    let base_url = 'https://graph.facebook.com/oauth';

    if (appId && appSecret && accessToken) {
        // Create API handler
        const api = new API({
            external: false,
            apiCred: {
                base_url,
            },
        });

        // create apiData object
        let apiData = {
            client_id: appId,
            client_secret: appSecret,
            grant_type: 'client_credentials',
        };

        let apiError;
        let _return = { success: false };
        // Make a GET request /access_token
        let apiResponse = await api.get(`/access_token`, apiData).catch((err) => (apiError = err));

        // Check if API success
        if (!apiError && apiResponse && apiResponse.success) {
            if (apiResponse.data) {
                _return.success = true;
                _return.data = apiResponse.data.access_token;
            }
        } else {
            console.error(apiError);
            _return.error = 'Failed to get app Accesstoken webhook.';
        }

        return _return;
    }
};

module.exports = {
    handleIncomingMessage,
    sendResponseMessage,
    generateAppAccessToken,
    createWebhookSubscription,
};
