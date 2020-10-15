const path = require('path');
const fs = require('fs');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const appDirectory = fs.realpathSync(process.cwd());
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);
const host = process.env.HOST || '0.0.0.0';
process.env.NODE_ENV = 'development';

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    // https://webpack.js.org/configuration/devtool/
    // https://webpack.js.org/guides/production/
    // https://blog.scottlogic.com/2017/11/01/webpack-source-map-options-quick-guide.html
    entry: resolveAppPath('src/dapp/src/index.js'),
    output: {
        path: resolveAppPath('prod/dapp'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.(js|jsx|es6)$/, exclude: /node_modules/, use: 'babel-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.scss$/i, loader: ExtractTextPlugin.extract(["css", "sass"])},
            { test: /\.(png|svg|jpg|gif)$/, exclude: /node_modules/, use: ['file-loader'] },
            { test: /\.html$/, use: 'html-loader'},
            { test: /\.sol/, loader: 'truffle-solidity' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            title: 'Flight Insurance Dapp',
            template: resolveAppPath('src/dapp/public/index.html'),
            favicon: resolveAppPath('src/dapp/public/favicon.ico')
        }),
        new CopyWebpackPlugin([
          { from: 'src/dapp/public/manifest.json', to: './', },
          { from: 'src/dapp/public/logo.png', to: './', },
          { from: 'src/dapp/src/assets', to: 'assets/images', },
          { from: 'src/dapp/public/robots.txt', to: './', }
        ]),
        new ExtractTextPlugin('app.css')
    ],
    resolve: {
        extensions: ['.js']
    },
    devServer: {
        contentBase: resolveAppPath('./src/dapp/'),
        compress: true,
        stats: 'errors-only',
        hot: true,
        host,
        port: 8000,
        publicPath: '/'
    }
};
