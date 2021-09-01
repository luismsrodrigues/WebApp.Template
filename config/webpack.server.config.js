var path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '..', 'src/main.ts'),
    target: "node",
    output: {
        path: path.resolve(__dirname, '..', 'build'),
        filename: 'index.js',
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.js'] 
    },
    module: {
        rules: [
            {
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname, '..', 'tsconfig.server.json')
                    }
                }],
                test: /\.ts?$/
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, '..', '.env.prod'), to: './' },
            ],
        })
    ]
}