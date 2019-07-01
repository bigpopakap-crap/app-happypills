module.exports = {
  extends: [
    'bigpopakap/base'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"]
      }
    },
  },
};