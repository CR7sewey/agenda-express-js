exports.middlewareGlobal = (req,res,next) => {
    res.locals.umaVariavelLocal = 'Este é o valor da variavel local';
    //console.log();
    //console.log('Estou no middle global');
    //onsole.log();
    //if (req.body.nome) { // instertar
     //   console.log('Ya é o teu nome maroto')
    //}
    next();
}

exports.checkCSRFerror = (err, req,res,next) => {
    if (err && err.code==='EBADCSRFTOKEN') {
        return res.send('BAD CSRF.');
    }

}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}