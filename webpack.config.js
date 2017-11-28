const {resolve} = require('path')

const config = {
  context: resolve(__dirname, 'src'),
  entry: {
    app: './index.js'
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist')
  }
}

module.exports = config
