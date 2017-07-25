let debug = process.env.NODE_ENV !== "production"
let webpack = require('webpack')
let path = require('path')

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : false,
  entry: "./js/main.js",
  module: {
      loaders: [
          {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel-loader',
              query: {
                  presets: ['react', 'es2015', 'stage-0'],
                  plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
              }
          }
      ]
  },
  output: {
    path: __dirname + "/src/",
    filename: "bundle.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
