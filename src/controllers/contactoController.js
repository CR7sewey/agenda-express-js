
exports.paginaInicial = (req,res) => { // action redireciona para a pagina que queremoos
    console.log(req.flash('info','oi'));
    const c = `<p>Introduza o seu contacto</p>
                <form action="/contacto" method="POST"> 
                <input type="text" name="contacto">
                <button>Submit</button>
                </form>`
    res.send(c);
}

exports.showContact = (req,res) => {
    res.send(`<p>O meu contacto é: ${req.body.contacto}.`);
}
