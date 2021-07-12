module.exports = {
	mode: 'development',
	target: 'web',
	entry: {
		index: './index.js',
	},
	watchOptions: {
		ignored: '/node_modules/',
	},
};
