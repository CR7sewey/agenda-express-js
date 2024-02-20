// Variaveis de ambiente (no caso info da base de dados, email, pass, usernames, etc)
require('dotenv').config(); 
// Express - npm install express
const express = require('express');
const app = express();

// Mongoose - vai modular a nossa base de dados e conectar com db
// como dados sao guardados na tabela
const mongoose = require('mongoose');
const connectionString = process.env.CONNECTIONSTRING;
mongoose.connect(connectionString) // Promise!
.then(() => {
    app.emit('pronto'); // emite sinal a ser capturado dps, ou seja, so permite requisicoes apos isto ser capturadp!
})
.catch(e => console.log(e)); // retorna pomessa, a conexao demora uns segundos, e ele comeca a escutar antes!

// Session - Indentifica navegador de um cliente, salvar um cookie com id do cliente
// sempre uq eo cliente conectar no servidor ele vai checar esse cookie (id de sessao), e verifica s eja conectou anterioromete
const session = require('express-session');
// Mongo - sessoes salvas na base de dados (e nao na memoria senao ficamos sem memoria rapido)
const MongoStore = require('connect-mongo');
// Flash - mensagens autodestrutivas, salvas em session
const flash = require('connect-flash');

// Rotas da app, ex: /home, /contactos etc
const routes = require('./routes');
// Path - trabalhar com caminhos
const path = require('path');
// helmet - recomendacao do express, ver
const helmet = require('helmet');
// csrf - tokens para os formularios, nao permite que os sites externos metam algo para a nossa app
const csrf = require('csurf');

const caminhoViews = path.resolve(__dirname,'src','views'); // caminho absolutos
const caminhoEstaticos = path.resolve(__dirname,'public'); // caminho absolutos
// Middlewares - funcoes executadas na rota!
const {middlewareGlobal, checkCSRFerror,csrfMiddleware } = require('./src/middlewares/middlewares'); // middleware


app.use(helmet());

// Podemos por formularios para dentro da nossa app
app.use(express.urlencoded({ extended: true})); // para o que se recebe do forms!!
// Podemos por json para dentro da nossa app
app.use(express.json());
// Arquivos estaticos sao acessados diretamente!
app.use(express.static(caminhoEstaticos)); // arquivos estaticos!!

// opcoes de session
const sessionOptions = session({
    secret: 'qweqweqwe123456',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24*7, // 7dias
        httpOnly: true,
    }
});

app.use(sessionOptions);
app.use(flash());

// Views - Arquivos renderizados na tela!
app.set('views',caminhoViews) // views, tmb dava com caminho relativo './src/views
// Engine usada para renderizar o html
app.set('view engine', 'ejs') // views engine, há varias! fazer if, for e assim no html (.ejs (tipo django html)) -> para instalar ejs: npm install ejs

// NOSSOS PROPRIOS MIDDLEWARES
app.use(csrf());
app.use(middlewareGlobal); // middleware, assim em todos os lugares! para especificar rota, meter antes 'rota' ex '/'
app.use(checkCSRFerror); // injetar o token em todas as paginas
app.use(csrfMiddleware); // csrf
app.use(routes);

// Porta para ficar a ouvir, 3000 etc
// http://localhost:3000
app.on('pronto', () =>{
    app.listen(3000, () => console.log('Estou a correr ...'));
}); // capturar evento!!
// para executar, node server.js !!!!!