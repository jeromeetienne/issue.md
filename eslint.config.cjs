const js = require('@eslint/js');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
    {
        ignores: ['dist/**', 'build/**', 'node_modules/**', 'coverage/**', '**/*.min.js']
    },
    js.configs.recommended,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                console: 'readonly',
                process: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly'
            }
        },
        plugins: {
            '@typescript-eslint': tsPlugin
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            // @jetienne: make any indentation notified 
            // indent: ['error', 2],
            indent: ['error', 'tab', { SwitchCase: 1 }],

            // @jetienne: allow unused variables
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',

            // @jetienne: allow the use of 'any' type
            '@typescript-eslint/no-explicit-any': 'off',
        }
    }
];
