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
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    }
}