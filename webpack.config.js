const path = require('path');
const merge = require('deepmerge');

const baseConfig = {
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
};

const buildConfig = {
    mode: 'production',
    entry: path.resolve(__dirname, 'source/build.js'),
    output: {
        filename: 'predictor.js',
        path: path.resolve(__dirname, 'lib'),
        library: 'predictor',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
};

const devConfig = {
    mode: 'development',
    entry: path.resolve(__dirname, 'source/index.js'),
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'web/dist'),
        publicPath: 'dist/',
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'web'),
        index: 'index.html',
        host: "0.0.0.0",
        port: 9000,
    }
};

module.exports = merge(
    baseConfig,
    process.env.WEBPACK_ENV === 'build' ? buildConfig : devConfig
);
