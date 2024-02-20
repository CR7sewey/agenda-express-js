exports.middlewareGlobal = (req,res,next) => {
    res.locals.errors = req.flash('errors'); // capturo erros
    res.locals.sucess = req.flash('success'); // capturo erros
    res.locals.user = req.session.user;
    //console.log();
    //console.log('Estou no middle global');
    //onsole.log();
    //if (req.body.nome) { // instertar
     //   console.log('Ya é o teu nome maroto')
    //}
    next();
}

exports.checkCSRFerror = (err, req,res,next) => {
    if (err) {
        return res.render('404');
    }
    next();

}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

// so ver contatos se tiver logado!
exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors','Tem de logar!');
        // salvar pq voi redirecionar
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
}