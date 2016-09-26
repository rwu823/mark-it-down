const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('./package.json')
const libName = pkg.name
const fs = require('fs')

const { NODE_ENV } = process.env
const isDev = (!process.env.NODE_ENV)
const isBuild = (NODE_ENV === 'build')
const isDemo = (NODE_ENV === 'demo')

const languages = fs.readdirSync(`${__dirname}/node_modules/prismjs/components`)
  .reduce((langs, lang)=> {
    if (lang.endsWith('.min.js')) {
      langs.push(`prismjs/components/${lang}`)
    }
    return langs
  }, [])

module.exports = {
  entry: {
    [libName]: isBuild
      ? ['./src']
      : ['./dev/client'],
  },
  output: {
    path: isBuild ? `${__dirname}/npm/dist` : `${__dirname}/gh-pages`,
    libraryTarget: isBuild ? 'commonjs2' : 'var',
    filename: '[name].js',
  },

  plugins: [
    new webpack.DefinePlugin({

    }),
    ...isBuild ? [

    ] : [
      new HtmlWebpackPlugin({
        template: './dev/demo.html'
      })
    ],
    ...isDemo ? [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
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
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: [
          'css?modules&localIdentName=[local]--[hash:base64:5]&sourceMap',
          'sass'
        ].join('!')
      },
      {
        test: /\.md$/,
        loader: 'raw',
      }
    ]
  },

  watch: isDev ,

  devtool: isDev ? 'eval' : false,

  externals: isBuild ? [...Object.keys(pkg.dependencies), ...languages] : {}
}
