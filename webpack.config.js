/* eslint comma-dangle:0 */
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const merge = require('webpack-merge');
const path = require('path');
const fs = require('fs');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  src: path.join(__dirname, 'src'),
  client: path.join(__dirname, 'src/index.js'),
  server: path.join(__dirname, 'src/index.js'),
  build: path.join(__dirname, './'),
};

let plugins;

if (process.env.NODE_ENV === 'production') {
  plugins = [
    new Dotenv({
      systemvars: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
    }),
  ];
} else if (process.env.NODE_ENV === 'test') {
  plugins = [new Dotenv({
    path: './.env.test',
  })];
} else {
  plugins = [new Dotenv()];
}

const common = {
  plugins,
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
        }],
      }
    ],
  }
};

const server = {
  entry: {
    app: PATHS.server,
  },
  output: {
    path: PATHS.build,
    filename: 'index.js',
  },
  target: 'node',
  // keep node_module paths out of the bundle
  externals: fs.readdirSync(
    path.resolve(__dirname, 'node_modules'))
    .reduce((ext, mod) => {
      const external = ext;
      external[mod] = `commonjs ${mod}`;
      return external;
    }, {}),
  node: {
    __filename: false,
    __dirname: false,
  },
};

let config;

switch (TARGET) {
  case 'build':
    config = merge(
      common,
      server
    );
    break;
  default:
    config = merge(
      common,
      server
    );
}

module.exports = config;
