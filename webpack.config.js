var entry = './app/index.js',
	output = {
		path: __dirname,
		filename: 'main.js'
	};
module.exports.development = {
	debug: true,
	devtool: 'eval',
	entry: entry,
	output: output,
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'jsx-loader?harmony'
		}]
	}
};
module.exports.production = {
	debug: false,
	entry: entry,
	output: output,
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'jsx-loader?harmony'
		}]
	}
};