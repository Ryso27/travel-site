const path = require('path');
module.exports = {
	entry: './app/assets/scripts/app.js',
	output: {
		path: path.resolve('./app/temp/scripts'),
		filename: 'app.js'
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