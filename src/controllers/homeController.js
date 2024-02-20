// HOME
const Contato = require('../models/ContatoModel');

exports.index = async function(req, res, next) {
    const lista_contatos = await Contato.getAll();
    res.render('index',{lista_contatos});
};
