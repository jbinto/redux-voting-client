// https://webpack.github.io/docs/configuration.html
var webpack = require('webpack');

module.exports = {
  entry: [
    // react-hot-loader: http://gaearon.github.io/react-hot-loader/getstarted/
    'webpack-dev-server/client?http://localhost:8080',  // "client-side library of the Webpack dev server"
    'webpack/hot/only-dev-server', // "Webpack hot module loader"

    './src/index.js',
  ],

  module: {
    loaders: [
      {
        // babel: https://babeljs.io/docs/setup/#webpack
        //        https://github.com/babel/babel-loader
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel' // react-hot-loader
      },
      {
        // autoprefixer-loader: https://github.com/passy/autoprefixer-loader#usage
        test: /.css$/,
        loader: 'style!css!autoprefixer?browsers=last 2 versions'
      }
    ]
  },
  // https://webpack.github.io/docs/configuration.html#resolve-extensions
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
