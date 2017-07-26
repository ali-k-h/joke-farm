//let debug = process.env.NODE_ENV !== "prod";
//console.log(debug + ' ' + process.env.NODE_ENV)
let webpack = require('webpack')
let path = require('path')

module.exports =(env) => {
    let debug = env !== "prod";
    console.log(debug + ' ' + env)
    return {
        context: path.join(__dirname, "src"),
        devtool: debug ? "inline-sourcemap" : false,
        entry: "./js/index.js",
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
            new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
        ]
    }
};
