// const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'development',
	target: 'web',
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader'],
			},
		],
	},
	entry: {
		index: './index.js',
	},
	output: {
		filename: 'index.js',
		library: {
			name: 'miaam',
			type: 'umd',
		},
	},
	// optimization: {
	// 	minimizer: [
	// 		new TerserPlugin({
	// 			terserOptions: {
	// 				format: {
	// 					comments: false,
	// 				},
	// 			},
	// 		}),
	// 	],
	// },
	watch: false,
	watchOptions: {
		ignored: '/node_modules/',
	},
	devtool: 'source-map',
};
