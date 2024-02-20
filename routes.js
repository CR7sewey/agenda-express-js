const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');


// ROTAS DA HOME - quem controla as rotas
route.get('/', homeController.index);


// Rotas de login
route.get('/login/', loginController.index)


module.exports = route;