const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'index.js',
    library: 'vektor-ds',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              exportOnlyLocals: true,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                sourceMap: true,
                javascriptEnabled: true,
              },
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './src/assets/scss/main.scss',
              sourceMap: true,
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              exportOnlyLocals: true,
              sourceMap: true,
              url: false,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    vue: 'vue',
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: 4,
        uglifyOptions: {
          compress: {},
        },
      }),
    ],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  performance: {
    hints: false,
  },
  devtool: '#source-map',
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
}
