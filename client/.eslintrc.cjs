module.exports = {
  env: { browser: true, node: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "react/prop-types": "off",
    semi: "error",
    eqeqeq: "error",
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
  },
};
