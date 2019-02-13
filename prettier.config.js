module.exports = {
    printWidth: 160,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: 'all',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    arrowParens: 'always',
    overrides: [
        {
            files: '*.js',
            options: {
                singleQuote: true,
            },
        },
    ],
};
