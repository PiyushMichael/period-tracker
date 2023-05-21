module.exports = {
  root: true,
  extends: ['@react-native-community'],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-hooks/exhaustive-deps': 'warn',
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
      },
    },
  ],
};
