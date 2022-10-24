const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

require('./db/mongoose');
const webhookRouter = require('./routers/webhook');
const productRouter = require('./routers/product');
const playgroundRouter = require('./routers/playground');

let app = express();
app = express().use(bodyParser.json());

app.use(express.json()); //parse json to object
app.use(playgroundRouter);
app.use(productRouter);
app.use(webhookRouter);

module.exports = app;
