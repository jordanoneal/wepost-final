const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    entry: './src/server.ts',
    target: 'node',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            }, {
                test: /\.html$/,
                use: 'ignore-loader',
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json',
            }),
        ],
        alias: {
            'common.interfaces': path.resolve(__dirname, '../common/lib/interfaces'),
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new webpack.IgnorePlugin({
        //     resourceRegExp: /^aws-sdk$|^nock$|^mock-aws-s3$/,  // Ignore optional dependencies
        // }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: 'package.json', to: 'package.json' } // Copy package.json to dist
        //     ]
        // }),
    ],
    // externals: [
    //     nodeExternals(),
    // ]
};
