module.exports = {
  root: true,
  // Use the configuration from .eslintrc.json
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  // Add overrides for specific files
  overrides: [
    {
      // Disable TypeScript for JavaScript config files
      files: ['*.js'],
      parserOptions: {
        project: null, // Disable TypeScript for these files
      },
      rules: {
        // Disable TypeScript-specific rules for JS files
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
