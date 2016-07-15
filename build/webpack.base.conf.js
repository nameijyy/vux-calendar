var path = require('path')
var config = require('../config')
var autoprefixer = require('autoprefixer');
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var deps =[
  '../src/assets/js/lib/fastclick.js',
  '../src/assets/js/common.js',
]

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src/'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'FastClick': path.resolve(__dirname, deps[0])
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.scss$|\.css$/,
        loader: "style-loader!css-loader!postcss-loader"

      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /vux.src.*?js$/,
        loader: 'babel'
      }


    ]
  },

  vue: {
    loaders: utils.cssLoaders()
  },
  postcss: [ autoprefixer({ browsers: ['last 1 versions'] }) ],

}

