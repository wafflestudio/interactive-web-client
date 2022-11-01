module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
    createDefaultProgram: true,
  },
  plugins: ["react", "@typescript-eslint"],
  extends: [
    "eslint:recommended", //ESLint basic rules
    "plugin:react/recommended", //extended rules for react
    "plugin:@typescript-eslint/recommended", //extended rules for Typescript
    "plugin:@typescript-eslint/recommended-requiring-type-checking", //extended rules for TS using inferred type information
    "plugin:import/recommended", //extended rules for import/export
    "plugin:import/typescript", //extended rules for import/export TS ver
    "next/core-web-vitals", //extended rules for Next
    "prettier", //disable all ESLint rules that collides with prettier
  ],
  rules: {
    "@typescript-eslint/no-misused-promises": "off",
    "import/order": [
      "warn",
      {
        groups: [
          "external",
          "builtin",
          "object",
          "internal",
          "parent",
          "sibling",
        ],
        pathGroups: [
          {
            pattern: "next",
            group: "external",
            position: "before",
          },
          {
            pattern: "./*.scss",
            group: "sibling",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["next", "./*.scss"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't basics any source code, like `@types/unist`
      },
    },
  },
};
