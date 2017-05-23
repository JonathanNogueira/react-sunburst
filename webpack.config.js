var path = require('path');

module.exports = {
    entry: './index.js',  
    context: path.resolve(__dirname, './src'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: "source-map",
    stats: {
         colors: true
     },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: { presets: ['es2015', 'react'] }
            }
        },
        {
            test: /\.(sass|scss)$/,
            use: [
            'style-loader',
            'css-loader',
            'sass-loader',
            ]
        }
        ]
    }
};