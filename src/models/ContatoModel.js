const mongoose = require('mongoose');
const validator  = require('validator');

// validacao caracteres
const ContatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ''},
    phone: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    criadoEm: {type: Date, default: Date.now},
});

const ContatoModel = mongoose.model('Contato', ContatoSchema); // retorna promise

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}



Contato.prototype.contactExists = async function() {
        const user = await ContatoModel.findOne({email: this.body.email});
        if (user) {
            this.errors.push('E-mail already registered!');
            return;
        }
};

Contato.prototype.numberExists = async function() {
    const user = await ContatoModel.findOne({phone: this.body.phone});
        if (user) {
            this.errors.push('Phone already registered!');
            return;
        }
};

Contato.prototype.valida = function() {
    if (this.body.email && !validator.isEmail(this.body.email)) {
        this.errors.push('E-mail invalid!');
    }
    if (!this.body.nome) this.errors.push('Nome é orbigadtório');
    if (!this.body.email && !this.body.phone) this.errors.push('Put an email or a phone!');

};

Contato.prototype.register = async function() { // retorna promise pq é async, assim, no controler a funcao tmb tem de ser
    this.valida();
    if (this.errors.length > 0) {
        return;
    }
    await this.contactExists();
    if (this.errors.length > 0) {
        return;
    }
    await this.numberExists();
    if (this.errors.length > 0) {
        return;
    }
    
    this.contato = await ContatoModel.create(this.body);    
};

Contato.prototype.cleanUp = function() {
    for (let key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }
    this.body = {
        nome: this.body.nome, 
        sobrenome: this.body.sobrenome,
        phone: this.body.phone, 
        email: this.body.email};

};

Contato.prototype.edit = async function(id) {
    if (typeof id !== 'string') {
        return;
    }
    this.valida();
    if (this.errors.length>0) {
        return;
    }
    this.contato = await ContatoModel.findByIdAndUpdate(id,this.body, {new: true}); 

}


//METODOS ESTATICOS
// nao esta atrelado ao prototype, noa precispo de instanciar, estatico
Contato.searchId = async function(id) {
    if (typeof id !== 'string') {
        return;
    }
    const contato = await ContatoModel.findById(id);
    return contato
}

Contato.getAll = async function() {
    const contato = await ContatoModel.find().sort({criadoEm: -1}); // decrescente
    return contato;
}

Contato.deleteContact = async function(id) {
    if (typeof id !== 'string') {
        return;
    }
    await ContatoModel.findByIdAndDelete(id,this.body);
}








/*
class Contato {
    constructor(body) {
        this.body = body; // body para todos os metodos da classe
        this.errors = [];
    }


    async contactExists() { // async pq vamos à bd
        const user = await ContatoModel.findOne({email: this.body.email});
        if (user) {
            this.errors.push('E-mail already registered!');
            return;
        }
    }

    async numberExists() { // async pq vamos à bd
        const user = await ContatoModel.findOne({phone: this.body.phone});
        if (user) {
            this.errors.push('Phone already registered!');
            return;
        }
    }

    valida() {
        // Validacao
        // Email
        if (!validator.isEmail(this.body.email)) {
            this.errors.push('E-mail invalid!');
        }
    }

    async register() { // retorna promise pq é async, assim, no controler a funcao tmb tem de ser
        this.valida();
        if (this.errors.length > 0) {
            return;
        }
        await this.contactExists();
        if (this.errors.length > 0) {
            return;
        }
        await this.numberExists();
        if (this.errors.length > 0) {
            return;
        }
        
        await ContatoModel.create(this.body);    
    }

}
*/
module.exports = Contato;