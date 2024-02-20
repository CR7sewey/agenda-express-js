const mongoose = require('mongoose');
const validator  = require('validator');
const bcriptjs = require('bcryptjs');

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

    async userExists() { // async pq vamos à bd
        const user = await UserModel.findOne({email: this.body.email});
        if (user) {
            this.errors.push('E-mail already registered!');
            return;
        }

    }

    async register() { // retorna promise pq é async, assim, no controler a funcao tmb tem de ser
        this.valida();
        if (this.errors.length > 0) {
            return;
        }

        await this.userExists();
        if (this.errors.length > 0) {
            return;
        }
        
     
        const salt = bcriptjs.genSaltSync();
        this.body.password =bcriptjs.hashSync(this.body.password,salt); // encriptografar password
        const user = await UserModel.create(this.body);
        this.user = user; // acessar no controler se quiser
    
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {email: this.body.email, password: this.body.password};
    }

    async login() {
        this.valida();
        if (this.errors.length > 0) {
            return;
        }
    
        this.user = await UserModel.findOne({email: this.body.email});
        if (!this.user) {
            this.errors.push('User doesnt exists!');
            this.user = null;
            return;
        }

        if (!bcriptjs.compareSync(this.body.password, user.password)) {
            this.errors.push('Password doesnt match!');
            this.user = null;
            return;
        }
    
    }

}

module.exports = User;