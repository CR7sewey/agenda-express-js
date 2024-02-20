import 'core-js/stable'; //pelas mesma razoes
import 'regenerator-runtime/runtime'; // senao pode dar erro pq os navegadores mais antigas nao teem isto
//import './assets/css/style.css';

import Login from './assets/modules/Login';

const formLogin = new Login('.form-login');
const formRegisto = new Login('.form-register');

formLogin.init();
formRegisto.init();
