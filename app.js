const express = require('express');

const SubscriberController = require('./controllers/SubscriberController');

const app = express();

app.get('/subscribers', SubscriberController.getAll);

module.exports = app;