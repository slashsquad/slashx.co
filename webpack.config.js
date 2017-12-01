const {resolve} = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const inProduction = (process.env.NODE_ENV === 'production')

const extractPlugin = new ExtractTextPlugin({
  filename: './assets/css/app.css'
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
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.scss$/,
        include: [resolve(__dirname, 'src', 'assets', 'sass')],
        use: extractPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: !inProduction
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !inProduction
              }
            }
          ],
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
              outputPath: './assets/media/images/'
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
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  devServer: {
    contentBase: resolve(__dirname, './dist/assets/media'),
    compress: true,
    stats: 'errors-only',
    port: 8888,
    open: true
  }
}

module.exports = config
