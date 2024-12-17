import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
    {
        ignores: ['dist'], // Ignore the `dist` folder.
    },
    {
        files: ['**/*.{ts,tsx}'], // Apply to TypeScript and TSX files.
        languageOptions: {
            ecmaVersion: 2020, // Modern ECMAScript.
            globals: globals.browser, // Browser globals like `window` and `document`.
            parser, // Use the TypeScript parser.
            parserOptions: {
                sourceType: 'module', // ECMAScript modules.
                ecmaFeatures: {
                    jsx: true, // Enable JSX parsing.
                },
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            '@typescript-eslint': typescriptEslint,
        },
        rules: {
            // JavaScript and TypeScript rules.
            ...typescriptEslint.configs.recommended.rules, // Include TypeScript recommended rules.

            // React Hooks rules.
            'react-hooks/rules-of-hooks': 'error', // Enforce rules of hooks.
            'react-hooks/exhaustive-deps': 'warn', // Warn on missing dependencies in hooks.

            // React Refresh rule.
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
        },
    },
];
