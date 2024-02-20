// CAMADA DE CONTROLO (REST p.ex.) - view e model a serem usados!

/*
const HomeModel = require('../models/HomeModel'); 

// ver compass
HomeModel.create({ // find para buscar dados
    titulo: 'This is a title 2',
    descricao: 'Uma descricao 2'
}) // retorna promessa!
.then(dados => console.log(dados))
.catch(e => console.log(e)); 
*/

exports.paginaInicial = (req, res, next) => {
   // req.session.usuario = {nome:'Miguel', logado:true}; // exemplo de session
    //req.flash('info','oi'); // flash de info
   // req.flash('error','erro'); // flash de error
    //res.send('Hello World');
    //console.log(req.flash('info'), req.flash('error'));
    //console.log(`DA PAGINA INICIAL: Olha a sessao: ${req.session.usuario}`)
    res.render('index', {
        titulo: 'This is a title',
        numeros: [0,1,2,3,4,5]
    }); // express renderiza o index.ejs!
    //next();
    //return; mata a resposta
};

exports.trataPost = (req, res) => {
    res.send(req.body);
    return; // mata
};