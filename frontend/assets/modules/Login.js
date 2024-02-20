import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        //const btn = this.form.querySelector('.btn');
        this.form.addEventListener('submit',(e) => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const email = el.querySelector('input[name="email"]');
        const password = el.querySelector('input[name="password"]');
        let valido = true;
        if (!email.value || !password.value) {
            alert('You need to introduce an email and password!');
            valido = false;
        }
        if (!validator.isEmail(email.value)) {
            alert('Wrong email. Ex: agenda@gmail.com');

            valido = false;
        }
        if (password.value <3 ||password.value >8 ) {
            alert('Invalid password!');

            valido = false;
        }
        
        if (valido) {
            el.submit();
        }
    }
}