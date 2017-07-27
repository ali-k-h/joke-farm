//let debug = process.env.NODE_ENV !== "prod";
//console.log(debug + ' ' + process.env.NODE_ENV)
let webpack = require('webpack')
let path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
module.exports =(env) => {
    let debug = env !== "prod";
    return {
        context: path.join(__dirname, "src"),
        devtool: debug ? "inline-sourcemap" : false,
        entry: ["./js/index.js",require.resolve('./src/css/main.less')],
       // entry: ["./js/index.js",require.resolve("./css/main.less")],
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
                },
                {
                    test: /\.less$/,
                    exclude: /(node_modules|bower_components)/,
                    use: !debug ?ExtractTextPlugin.extract(
                        {
                            fallback: 'style-loader',
                            use: ['css-loader', 'less-loader']
                        }):
                        [{
                            loader: "style-loader"
                        }, {
                            loader: "css-loader"
                        }, {
                            loader: "less-loader", options: {
                                strictMath: true,
                                noIeCompat: true
                            }
                        }]
                }
            ]
        },
        output: {
            path: debug? __dirname + "/src/":__dirname + "/dist_/",
            filename: "bundle.js"
        },
        plugins: debug ? [] : [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true,
                    warnings: false
                }
            }),
            new ExtractTextPlugin({
               // filename: "[name].[contenthash].css",
                //path: __dirname + "/src/",
                filename: "main.css",
              //  disable: debug
            })
           // new ExtractTextPlugin('main.css'),

        ]
    }
};
