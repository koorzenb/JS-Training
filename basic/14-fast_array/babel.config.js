module.exports = {
    plugins: ["@babel/plugin-proposal-throw-expressions"],
    presets: [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage", // alternative mode: "entry"
                "corejs": 3, // default would be 2
                "targets": {
                    node: 'current',
                },
            }
        ]
    ],
};