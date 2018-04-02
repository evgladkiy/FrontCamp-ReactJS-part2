module.exports = {
    "extends": "airbnb",
    "plugins": ["jest"],
    "rules": {
        "linebreak-style": 0,
        "no-underscore-dangle": ["error", { "allow": ["_id", "_json"] }],
        "indent": ["error", 4, {
             "SwitchCase": 1,
             'ignoredNodes': ['JSXElement *']
         }],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 2],
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "hrefLeft", "hrefRight" ],
            "aspects": [ "invalidHref" ]
        }],
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
    },
    "env": {
        "browser": true,
        "node": true
    }
};
