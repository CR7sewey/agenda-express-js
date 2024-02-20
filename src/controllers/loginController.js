// Login
const User = require('../models/UserModel');

exports.index = (req, res, next) => {
    res.render('login');
};

exports.register = async function(req, res, next) {
   
    try {
        const user = new User(req.body);
        await user.register();
        if (user.errors.length > 0) {
            req.flash('errors',user.errors);
            req.session.save(function() {
                return res.redirect('back');
            }); // salaver sessao 
            return;
        }
        req.flash('success','Usuario criado com sucesso');
            req.session.save(function() {
                return res.redirect('back');
            }); // salaver sessao
    }   
    catch(e) {
        console.log(e);
        return res.render('404');
        
    }
    //
};



exports.logar = async function(req, res, next) {
    try {
        const login = new User(req.body);
        await login.login();
        console.log(login,'-------------');
        if (login.errors.length > 0) {
            req.flash('errors',login.errors);
            req.session.save(function() {
                return res.redirect('back');
            }); // salaver sessao 
            return;
        }

        req.flash('success','Usuario logado com sucesso');
        req.session.user = login.user;
        req.session.save(function() {
                return res.redirect('back');
            }); // salaver sessao
    
        }
         
    catch(e) {
        console.log(e);
        return res.render('404');
    }
}