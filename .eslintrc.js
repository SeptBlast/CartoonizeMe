module.exports = {
    root: true,
    plugins: ["prettier"],
    extends: "@react-native-community",
    parserOptions: {
        ecmaVersion: 12,
    },
    env: {
        es2021: true,
        node: true,
    },
    rules: {
        "@typescript-eslint/quotes": ["info", "double", { avoidEscape: true, allowTemplateLiterals: true }],
    },
};
