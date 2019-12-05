module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest": true
  },
  "parser": "babel-eslint",
  "extends": [
    "airbnb-base",
    'plugin:jest/recommended'
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
  },
  "rules": {
    'import/no-cycle': 0,
    'no-undef': 0,
    'new-cap': 0,
    'import/no-mutable-exports': 0,
    'no-unused-vars': 0
  }
}
