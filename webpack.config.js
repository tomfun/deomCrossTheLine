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
};
