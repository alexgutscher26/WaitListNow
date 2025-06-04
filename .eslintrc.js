module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:import/warnings",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  rules: {
    // TypeScript: Enforce strict typing, no 'any'
    "@typescript-eslint/no-explicit-any": "error",
    // TypeScript: Warn on unused vars, but allow _-prefixed
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
    // TypeScript: Disallow empty interfaces
    "@typescript-eslint/no-empty-interface": "warn",
    // TypeScript: Disallow empty object types
    "@typescript-eslint/no-empty-object-type": "warn",
    // React: Prefer named exports, no default exports
    "import/no-default-export": "error",
    // React: Enforce PascalCase for components
    "react/jsx-pascal-case": "error",
    // Accessibility: Enforce label association
    "jsx-a11y/label-has-associated-control": "error",
    // Accessibility: Enforce keyboard events for clickable elements
    "jsx-a11y/click-events-have-key-events": "error",
    "jsx-a11y/no-static-element-interactions": "error",
    // Import order: Group and alphabetize imports
    "import/order": ["warn", {
      "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
      "alphabetize": { "order": "asc", "caseInsensitive": true }
    }],
    // React: Warn on unescaped entities in JSX
    "react/no-unescaped-entities": "warn",
    // React: Warn on unknown properties
    "react/no-unknown-property": "warn"
  },
  overrides: [
    {
      // For JS config files, relax TypeScript rules
      files: ['*.js'],
      parserOptions: {
        project: null,
      },
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-function-return-type": "off"
      }
    }
  ]
}; 