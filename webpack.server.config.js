const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/main.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.server.json"
      })
    ]
  },
  module: {
    rules: [
      {
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: "tsconfig.server.json"
            }
          }
        ],
        test: /\.ts?$/
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: '.env.prod', to: './' },
        { from: 'ormconfig.json', to: './' }
      ]
    })
  ],
  externals: [nodeExternals()]
};
