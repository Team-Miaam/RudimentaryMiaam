module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: ['airbnb-base', 'prettier'],
	parser: '@babel/eslint-parser',
	parserOptions: {
		sourceType: 'module',
		babelOptions: {
			configFile: './.babelrc',
		},
	},
	plugins: ['@babel', 'import', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
	},
	settings: {},
};
