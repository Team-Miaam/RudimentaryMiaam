module.exports = {
	mode: 'development',
	target: 'web',
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
	watch: true,
	watchOptions: {
		ignored: '/node_modules/',
	},
};
