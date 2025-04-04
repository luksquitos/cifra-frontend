import antfu from '@antfu/eslint-config'
import styledA11y from 'eslint-plugin-styled-components-a11y';

const antfuConfig = antfu(
    {
        formatters: true,
        stylistic: {
            indent: 2,
            semi: false,
            quotes: 'single',
        },
        typescript: true,
        react: true,
    },
    {
        plugins: {
            'styled-components-a11y': styledA11y,
        }
    },
    {
        rules: {
            "react-refresh/only-export-components": 'off',
            'ts/no-redeclare': 'off',
            'ts/consistent-type-definitions': ['error', 'type'],
            'no-console': ['warn'],
            'antfu/no-top-level-await': ['off'],
            'node/prefer-global/process': ['off'],
            'node/no-process-env': ['error'],
            'perfectionist/sort-imports': [
                'error',
                {
                    tsconfigRootDir: '.',
                },
            ],
            'unicorn/filename-case': [
                'error',
                {
                    case: 'kebabCase',
                    ignore: ['README.md'],
                },
            ],
        },
    },
)

export default antfuConfig
