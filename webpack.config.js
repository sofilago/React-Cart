var path = require('path');

module.exports = {
    devtool: 'sourcemaps',
    entry: './src/main.js',
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss?$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};
