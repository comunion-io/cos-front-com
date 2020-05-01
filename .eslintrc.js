module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    rules: {
        "no-console": 'off',
        // 定义过的变量必须使用
        "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
        // 变量必须先定义后使用
        'no-use-before-define': [
            'error',
            {
                functions: false,
                classes: false,
                variables: false
            }
        ],
        // 禁止重复 import 模块
        'no-duplicate-imports': 'error',
        // 禁止使用 new 来生成 Symbol
        'no-new-symbol': 'error',
        // @off 它用于限制某个具体的模块不能使用
        'no-restricted-imports': 'off',
    },
    parserOptions: {
        parser: "babel-eslint"
    }
} 
