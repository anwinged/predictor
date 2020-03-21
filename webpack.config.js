const path = require('path');
const merge = require('deepmerge');

const baseConfig = {
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                },
            },
        ]
    },
};

const buildConfig = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
        filename: 'predictor.min.js',
        path: path.resolve(__dirname, 'built'),
        library: 'predictor',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
};

const devConfig = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
        filename: 'predictor.js',
        path: path.resolve(__dirname, 'built'),
        library: 'predictor',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
};

module.exports = merge(
    baseConfig,
    process.env.WEBPACK_ENV === 'build' ? buildConfig : devConfig
);
