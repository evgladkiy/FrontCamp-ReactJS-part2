module.exports = {
    "extends": "airbnb",
    "rules": {
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
        }]
    },
    "env": {
        "browser": true,
        "node": true
    }
};
