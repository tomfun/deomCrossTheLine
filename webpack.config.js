'use strict';

const webpack = require('webpack');

module.exports = {
    entry: './src/src.jsx',
    output: {
        filename: './public/bundle.js',
    },
    target: "web",

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js'],
    },

    plugins: process.env.NODE_ENV === 'production'
        ? [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true
                },
                comments: false,
                sourceMap: false
            }),
            new webpack.ProvidePlugin({
                // 'Promise': 'bluebird/js/browser/bluebird', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
                'Promise': 'bluebird', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
                'fetch': 'isomorphic-fetch',
            }),
            /* &&*/
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production'),
                },
            }),
        ]
        : [],

};
