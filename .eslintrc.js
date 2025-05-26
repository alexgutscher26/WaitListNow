module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['custom'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
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
