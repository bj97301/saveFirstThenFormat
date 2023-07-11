module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'standard-with-typescript', 'prettier'],
  overrides: [
    {
      files: ['*Test.js'],
      rules: {
        'no-import-assign': 0,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prefer-let', 'prefer-arrow'],
  rules: {
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArray: true,
        allowArrowFunction: true,
        allowAnonymousClass: true,
        allowAnonymousFunction: true,
        allowCallExpression: true,
        allowNew: true,
        allowLiteral: true,
        allowObject: true,
      },
    ],
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: true,
        classPropertiesAllowed: false,
      },
    ],
    'prefer-arrow-callback': ['error', {allowNamedFunctions: true}],
    'func-style': ['error', 'expression', {allowArrowFunctions: true}],
    // allow .js files to contain JSX code
    'prefer-let/prefer-let': 2,
    'prefer-const': 'off',
    'arrow-parens': 0,
    eqeqeq: 0,
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    semi: ['error', 'never'],
  },
}
