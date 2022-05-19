const config = require('./dataverse.config.json');
const path = require('path');
const spawn = require('cross-spawn');
const WebpackEventPlugin = require('webpack-event-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: config.entries,

  output: {
    filename: '[name].js',
    library: ['Jt', '[name]'],
    path: path.resolve(__dirname, 'lib')
  },
  
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        enforce: 'pre',
        test: /\.(ts)|(js)$/,
        loader: 'source-map-loader'
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new WebpackEventPlugin([
      {
        hook: 'afterEmit',
        callback: compilation => {
          if (compilation.errors != null && compilation.errors.length > 0) {
            return;
          } else {
            const assets = Array.from(compilation.emittedAssets || compilation.assets).map(asset => path.basename(asset));

            spawn('npm', ['run', 'deploy', '-- --files=', assets.join(',')], { cwd: process.cwd(), stdio: 'inherit' });
          }
        }
      }
    ])
  ]
}