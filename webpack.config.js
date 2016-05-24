var path = require('path')

var webpack = require('webpack')

module.exports = {
  entry: './js/index.js',
  output: {
    path: path.resolve('public/js/'),        // \ put stuff in 'build' dir, but
    publicPath: '/js/',                      // / webpack-dev-server will pretend it is here
    filename: 'bundle.js'                    // if bundled
  },
  plugins: [],
  devServer: {
    contentBase: 'public'            // serve everything else from here
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.(js|es6)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!autoprefixer-loader'

      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
      },
      {
        test: /\.(png|jpg|ttf|eot)$/,          // base64 inline images and fonts less than 8kb
        exclude: /node_modules/,               // works on document.createElement('img').src = require('./img.png')
        loader: 'url-loader?limit=8192'        // also works in css - background: url('./img.png'); or @font-face {font-family: 'x'; src: url('./font.ttf');}
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.es6']  // files webpack accepts when requiring/importing
  }
}
