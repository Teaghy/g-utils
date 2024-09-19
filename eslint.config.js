import antfu from '@antfu/eslint-config';

export default antfu(
  {
    type: 'lib',
    formatters: true,
    stylistic: {
      semi: true,
      overrides: {
        'style/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'semi',
              requireLast: true,
            },
            singleline: {
              delimiter: 'semi',
              requireLast: true,
            },
            multilineDetection: 'brackets',
          },
        ],
      },
    },
  },
  {
    files: ['**/*.ts'],
    // rules: {
    //   'style/semi': ['error', 'never'],
    // },
  },
);
