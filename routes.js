const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contactoController = require('./src/controllers/contactoController');


function meuMiddleware(req, res, next) {
    req.session = {nome: 'Mike',}
    console.log('');
    console.log('!!!!!!!!!Passei no middleware');
    console.log('');
    next(); // para chamar o middleware a seguir
};

// IDENTICO A url file do DJANGO

// ROTAS DA HOME - quem controla as rotas
// so fazer roteamento, chama controlador para app que decide qual view e model para a app
//route.get('/', meuMiddleware, homeController.paginaInicial, function(req, res, next) {console.log('Estou AQUI!!! ULTIMO MIDDLEWARE')});
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);

// ROTAS DE CONTACTO
route.get('/contacto', contactoController.paginaInicial);
route.post('/contacto', contactoController.showContact);



module.exports = route;