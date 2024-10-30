// eslint-disable-next-line n/no-extraneous-import
import eslintConfig from '@ehmicky/eslint-config'

export default [
  ...eslintConfig,
  {
    rules: {
      'n/no-sync': 0,
    },
  },
]
