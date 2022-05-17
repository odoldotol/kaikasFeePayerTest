const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/App.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
    resolve: {
        fallback: {
            fs: false,
            net: false,
            stream: require.resolve('stream-browserify'),
            crypto: require.resolve('crypto-browserify'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
        }
    },
}