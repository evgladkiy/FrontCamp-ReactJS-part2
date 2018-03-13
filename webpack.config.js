const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        bundle: path.join(__dirname, '/src/index'),
    },
    output: {
        path: path.join(__dirname, '/public'),
        filename: '[name].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                },
            }, {
                test: /\.less$/,
                exclude: /(node_modules)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader'],
                }),
            },
        ],
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 3000,
        hot: true,
        inline: true,
        stats: 'errors-only',
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
    ],
};
