const express = require('express');//puxando o express

const OngController = require('./controllers/OngController');

const routes = express.Router();//setando o express

routes.get('/ongs', OngController.index);

routes.post('/ongs', OngController.create);
module.exports = routes;