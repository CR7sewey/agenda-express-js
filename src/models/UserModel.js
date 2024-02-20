const mongoose = require('mongoose');
const validator  = require('validator');

// validacao caracteres
const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},

});

const UserModel = mongoose.model('User', UserSchema); // retorna promise

class User {
    constructor(body) {
        this.body = body; // body para todos os metodos da classe
        this.errors = [];
        this.user = null;
    }

    valida() {
        this.cleanUp(); // limpa objeto
        // Validacao
        // Email
        if (!validator.isEmail(this.body.email)) {
            this.errors.push('E-mail invalid!');
        }
        //senha ter entre 3 e 8
        if (this.body.password.length <3 || this.body.password.length >8 ) {
            this.errors.push('Senha tem de ter entre 3 e 8 caracteres!');
        }
    }

    async register() { // retorna promise pq é async, assim, no controler a funcao tmb tem de ser
        this.valida();
        if (this.errors.length > 0) {
            return;
        }
        try {
        const user = await UserModel.create(this.body);
        this.user = user; // acessar no controler se quiser
        }
        catch(e) {
            console.log(e);
        }
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {email: this.body.email, password: this.body.password};
    }

}

module.exports = User;