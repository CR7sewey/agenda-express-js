// MODULO!!!
const path = require('path'); // CommonJS como sistema de modulos, !== do ES6 (js)

// configuracao do webpack
module.exports= {
    mode: 'development', // so gera arquivos, nao é minificado com isto, podia ser production
    entry: './frontend/index.js', // arquivo de entrada, no src (codigo fonte)!!
    output: {
        path: path.resolve(__dirname, 'public','assets','js'),
        filename: 'bundle.js',
    },    // usario ve
    module: {
        rules: [{
            exclude: /node_modules/, // regex
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            },

        },{
            test: /\.css$/,
            use: ['style-loader','css-loader'] // css
        }],
    }, //babel
    devtool: 'source-map', // mapeia erro no arquivo original e nao no bundle gerado

}