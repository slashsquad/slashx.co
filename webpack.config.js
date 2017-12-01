const {resolve} = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const inProduction = (process.env.NODE_ENV === 'production')

const extractPlugin = new ExtractTextPlugin({
  filename: './assets/css/app.css',
  disable: !inProduction
})

const config = {
  context: resolve(__dirname, 'src'),
  entry: {
    app: './index.js'
  },
  output: {
    filename: './assets/js/[name].js',
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.scss$/,
        include: [resolve(__dirname, 'assets', 'scss')],
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/images/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    extractPlugin,
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: resolve(__dirname, './assets/images/favicon.png')
    }),
  ],
  devServer: {
    contentBase: resolve(__dirname, './dist/assets'),
    compress: true,
    stats: 'errors-only',
    port: 8888,
    open: true
  }
}

module.exports = config
