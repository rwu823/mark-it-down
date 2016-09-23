const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDev = !process.env.NODE_ENV
const pkg = require('./package.json')
const libName = pkg.name
const fs = require('fs')

const languages = fs.readdirSync(`${__dirname}/node_modules/prismjs/components`)
  .reduce((langs, lang)=> {
    if (lang.endsWith('.min.js')) {
      langs.push(`prismjs/components/${lang}`)
    }
    return langs
  }, [])

module.exports = {
  entry: {
    [libName]: isDev
      ? ['babel-polyfill', './dev/client']
      : ['./src'],
  },
  output: {
    path: `${__dirname}/npm/dist`,
    libraryTarget: 'umd',
    // library: 'MarkItDown',
    umdNamedDefine: false,
    filename: '[name].js',
  },

  plugins: [
    new webpack.DefinePlugin({

    }),
    ...isDev ? [
      new HtmlWebpackPlugin()
    ] : []
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style',
          isDev
            ? 'css?modules&localIdentName=[local]--[hash:base64:5]&sourceMap'
            : 'css?modules&localIdentName=[hash:base64:5]',
          'sass'
        ],
      },
      {
        test: /\.md$/,
        loader: 'raw',
      }
    ]
  },

  watch: isDev ,

  devtool: isDev ? 'eval' : false,

  externals: isDev ? {} : [...Object.keys(pkg.dependencies), ...languages]
}