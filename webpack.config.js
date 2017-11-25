const path = require('path')
const productionEnvironment = (process.env.NODE_ENV === 'production')

const config = {
  entry: path.resolve(__dirname, './app/public/source/index.js'),
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
  },
  devtool: productionEnvironment ? undefined : 'inline-source-map '
}

module.exports = config
