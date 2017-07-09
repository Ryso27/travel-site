const path = require('path');
module.exports = {
	entry: {
		app: './app/assets/scripts/app.js',
		vendor: './app/assets/scripts/vendor.js'
	},
	output: {
		path: path.resolve('./app/temp/scripts'),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				test: /\.js$/, //applies babel loader only to js files
				exclude: /node_modules/
			}
		]
	}
}