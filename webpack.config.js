module.exports = {
    entry: [
        './src/app.jsx'
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                // use: {
                //     loader: 'babel-loader',
                // }
                loader: "babel-loader",
                query: {
                    presets: ['react']
                }
            },
            { 
                test: /\.css$/, 
                use: [ 'style-loader', 'css-loader' ] 
            },
        ]
    },
    /* webpack hack to get private ig working in image.jsx */
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    }
}