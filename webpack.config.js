const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const basePath = path.resolve(__dirname);
const dotenv = require('dotenv');
dotenv.config();

const _apiPort = process.env.API_PORT || 3000;
const _clientPort = process.env.CLIENT_PORT || 3001;

module.exports = {
    entry: path.resolve(basePath, "src/client/index.tsx"),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: "tsconfig.client.json"
                }
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(basePath, 'src/client/static/index.html'),
            favicon: path.resolve(basePath, 'src/client/static/favicon.ico'),
            title: "Tac Template",
            description: "Tac Template"
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(basePath, 'src/client/static/robots.txt'), to: './' },
                { from: path.resolve(basePath, 'src/client/static/manifest.json'), to: './' }
            ],
        })
    ],
    output: {
        path: path.join(basePath, 'build', "www"),
        filename: 'bundle.js',
        publicPath: '/',
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: "./tsconfig.client.json"
            })
        ]
    },
    devServer: {
        static: './build',
        compress: true,
        watchFiles: ['.src/client**'],
        hot: true,
        port: _clientPort,
        proxy: {
            '/api': 'http://localhost:' + _apiPort,
        },
    }
};