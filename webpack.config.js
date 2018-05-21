const path = require('path');


module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'source/index.js'),
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: "0.0.0.0",
        port: 9000,
    }
};
