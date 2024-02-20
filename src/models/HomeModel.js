
const mongoose = require('mongoose');

// validacao caracteres
const HomeSchema = new mongoose.Schema({
    titulo: {type: String, require: true},
    descricao: String,

});

const HomeModel = mongoose.model('Home',HomeSchema);

//module.exports = HomeModel;
// na pratica vou criar class, valido dados, e faco export da classe

class Home {

}

module.exports = Home;