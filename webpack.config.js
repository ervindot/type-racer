const path = require('path')

const config = {
  entry: path.resolve(__dirname, './app/public/source/index.jsx'),
  output: {
    path: path.resolve(__dirname, './app/public/build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = config
