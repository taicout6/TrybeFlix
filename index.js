require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');

const SubscriberController = require('./controllers/SubscriberController');

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());

app.get('/subscribers', SubscriberController.getAll);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
