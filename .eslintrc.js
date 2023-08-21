module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "prefer-arrow-callback": "off",
    "func-names": "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
  },
  ignorePatterns: ["bin/www"],
};
