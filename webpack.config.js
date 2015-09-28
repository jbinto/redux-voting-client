// https://webpack.github.io/docs/configuration.html

module.exports = {
  entry: [
    './src/index.js'
  ],

  // https://babeljs.io/docs/setup/#webpack
  // https://github.com/babel/babel-loader
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        // see https://github.com/passy/autoprefixer-loader#usage
        test: /.css$/,
        loader: 'style!css!autoprefixer?browsers=last 2 versions'
      }]
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
    contentBase: './dist'
  }
};
