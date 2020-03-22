module.exports = {
	root: true,
	env: {
		node: true,
		es6: true
	},
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: "module"
	},
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint/eslint-plugin"
	],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended"
	]
};