const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appConfig = require('./app');

const env = process.env.NODE_ENV;
const isDevelopment = env === 'development';
const isProduction = env === 'production';
const isSystemTests = process.env.SYSTEM_TESTS;
const enableDebuggingTools = isDevelopment && !isSystemTests;

const plugins = [];

if (enableDebuggingTools) {
  plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: 'CQASO',
        template: path.join(appConfig.entryPath, 'template.html'), // Load a custom template
        inject: 'body',
        favicon: path.join(appConfig.entryPath, 'ui/static/img/favicon.png')
      }), // Inject all scripts into the body
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
      })
     );
} else {
  plugins.push(
      new HtmlWebpackPlugin({
        title: 'CQASO',
        template: path.join(appConfig.entryPath, 'template.html'), // Load a custom template
        inject: 'body',
        favicon: path.join(appConfig.entryPath, 'ui/static/img/favicon.png')
      }), // Inject all scripts into the body
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      })
    );
}

module.exports = {
  cache: true,
  devtool: isProduction ?
    'cheap-module-source-map' : 'cheap-module-eval-source-map',

  entry: [path.join(appConfig.entryPath, 'index.js')],

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    port: 8081,
    host: '0.0.0.0',
  },

  output: {
    path: appConfig.distPath,
    publicPath: (isProduction ? './' : '/'),
    filename: (isProduction ?
      'js/app-[hash].js' :
      'js/app.js'),
    chunkFilename: (isProduction ?
      'js/[id]-[chunkhash].js' :
      'js/[id].js'),
  },

  externals: {
    'docsJson': '__DOCS_JSON__'
  },

  plugins,

  resolve: {
    modulesDirectories: [
      '.', 'node_modules',
    ],
    extensions: [
      '', '.js', '.jsx',
    ],
  },

  module : {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: path.join(process.cwd(), 'node_modules')
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.css$/,
        loaders: [
          'style-loader', 'css-loader', 'cssnext-loader',
        ],
        exclude: path.join(process.cwd(), 'node_modules')
      }, {
        test: /\.css$/,
        loaders: [
          'style-loader', 'css-loader',
        ],
        include: path.join(process.cwd(), 'node_modules'),
      }, {
        test: /\.png/,
        loader: 'url?limit=10000'
      }, {
        test: /\.jpg/,
        loader: 'file'
      }, {
        test: /\.gif/,
        loader: 'file'
      }, {
        test: /\.svg/,
        loader: 'file'
      },
    ],
    preLoaders: [
      {
        test: /index\.jsx$/,
        loaders: ['baggage?style.css'],
        exclude: path.join(process.cwd(), 'node_modules')
      }
    ]
  },

  cssnext: {
    features: {
      customProperties: {
        variables: {
          textColor: 'black',
          backgroundColor: '#E4E4E4',
          altBackgroundColor: '#444444',
          accentColor: '#61D2DC',
          extraColor: '#41B3D3',
        }
      }
    }
  },
};
