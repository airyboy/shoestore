module.exports = {
    "extends": "airbnb",
    "settings": {
        "import/parser": "babel-eslint",
        "import/resolve": {
            "moduleDirectory": ["node_modules", "src"]
        },
        "ecmaFeatures": {
            "classes": true,
            "jsx": true
        },
    },
    "rules": {
        "comma-dangle": 0,  // not sure why airbnb turned this on. gross!
        "indent": [2, 2, {"SwitchCase": 0}],
        "no-console": 0,
        "no-alert": 0,
        "max-len": ["error", 150],
      },
};