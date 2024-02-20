const Contato = require('../models/ContatoModel');



exports.index = (req,res,next) => {
    res.render('contato', {contato: {}}); // para ter algo vazio e nao dar erro no value do ejs
};

// async pq no model é
exports.register = async function(req,res,next) {
    try {
        console.log('AQUI ---')
        const contato = new Contato(req.body);
        console.log(contato)
        await contato.register();
        if (contato.errors.length > 0) {
            console.log('AQUI 2 ---')

            req.flash('errors',contato.errors);
            req.session.save(function() {
                return res.redirect('back');
            }); // salaver sessao 
            return;
        }
        console.log('AQUI 3 ---')

        req.flash('success','Contato criado com sucesso');
            req.session.save(function() {
                return res.redirect(`/contato/${contato.contato._id}`);
        }); // salaver sessao

    }
    catch(e) {
        console.log(e)
        return res.render('404');
    }
};


exports.editIndex = async function(req,res,next) {
    if (!req.params.id) return res.render('404');
    const contato = await Contato.searchId(req.params.id);
    if (!contato) return res.render('404');

    res.render('contato',{contato: contato})
};

exports.edit = async function(req,res,next) {
    try{

        if (!req.params.id) return res.render('404');
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    if (contato.errors.length > 0) {
        console.log('AQUI 2 ---')

        req.flash('errors',contato.errors);
        req.session.save(function() {
            return res.redirect('back');
        }); // salaver sessao 
        return;
    }
    console.log('AQUI 3 ---')

    req.flash('success','Contato atualizado com sucesso');
        req.session.save(function() {
            return res.redirect(`/contato/${contato.contato._id}`);
    }); // salaver sessao
    return;
    }
    catch(e){
        res.render('404');
    }
    

};
