const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { experiments } = require('webpack');
module.exports = {
  entry: './index.js',
  mode: 'development',
  target:'es2020',
  devtool: false,
  experiments:{
    outputModule:true,
  },
  output: {
    publicPath: 'http://localhost:3001/',
    clean: true,
  },
  cache: false,
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.css', '.scss', '.jpg', 'jpeg', 'png'],
  },
  devServer: {
    allowedHosts: 'all',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    proxy: {
      "*": {
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
      },
    }
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'component_app',
      library:{type:"module"},
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button.jsx',
      },
    })
  ],
};