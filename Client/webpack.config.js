{
	entry: ["babel-polyfill", "./src/**"]
    devtool: 'inline-source-map';
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
			options: {
				presets: ["react", "es2015", "stage-0"]
			}
        }]
    }
}