var path = require('path')

var webpack = require('webpack')

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve('public/js/'),
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  plugins: [],
  devServer: {
    contentBase: 'public',
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.(js)$/,
        include: [
          /node_modules\/gsap/,
          /node_modules\/scrollmagic/,
        ],
        loader: 'imports?define=>false',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style!css!autoprefixer',

      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style!css!autoprefixer!sass',
      },
      {
        test: /\.(png|jpg|ttf|eot)$/,          // base64 inline images and fonts less than 8kb
        exclude: /node_modules/,               // works on document.createElement('img').src = require('./img.png')
        loader: 'url?limit=8192',              // also works in css - background: url('./img.png'); or @font-face {font-family: 'x'; src: url('./font.ttf');}
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'raw',
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.scss'],
  },
}
