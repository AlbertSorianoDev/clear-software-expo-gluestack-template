import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginImport from "eslint-plugin-import";
import globals from "globals";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  js.configs.recommended,

  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ),

  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
        React: "writable",
      },
    },
    plugins: {
      prettier: pluginPrettier,
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      import: pluginImport,
    },
    rules: {
      // React
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",

      // TS
      "@typescript-eslint/no-unused-vars": ["warn"],

      // Prettier
      "prettier/prettier": "warn",

      // Imports
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
];
