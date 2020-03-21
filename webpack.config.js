const path = require('path');

module.exports = (env = {}) => ({
    mode: env.production ? 'production' : 'development',
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
        filename: env.production ? 'predictor.min.js' : 'predictor.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'predictor',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                },
            },
        ],
    },
});
