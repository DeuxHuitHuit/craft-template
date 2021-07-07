module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	parserOptions: {
		ecmaVersion: '2021',
	},
	globals: {
		App: 'readonly',
		jQuery: 'readonly',
		_: 'readonly',
		$: 'readonly',
	},
	overrides: [
		{
			files: [
				'web/assets/js/fx/*.js',
				'web/assets/js/modules/*.js',
				'web/assets/js/utils/*.js',
				'web/assets/js/com/*.js',
			],
			rules: {
				'no-bitwise': 'error',
				'no-undef': 'error',
				'no-global-assign': 'error',
				'no-console': ['error', { allow: ['warn', 'error'] }],
				curly: 'error',
				eqeqeq: 'error',
				'guard-for-in': 'error',
				'no-extend-native': 'error',
				'no-unused-vars': 'error',
				'no-use-before-define': 'error',
				'new-cap': 'error',
				'no-empty': 'error',
				strict: ['error', 'function'],
				quotes: ['error', 'single'],
				'max-params': ['error', 5],
				'max-len': [
					'error',
					{
						code: 100,
						ignoreComments: true,
						ignoreTrailingComments: true,
						ignoreUrls: true,
						ignoreTemplateLiterals: true,
						ignoreStrings: true,
					},
				],
				'no-irregular-whitespace': 'error',
				'dot-notation': 'error',
				semi: ['error', 'always'],
				'semi-style': ['error', 'last'],
			},
		},
	],
};
