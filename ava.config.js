import avaConfig from '@ehmicky/dev-tasks/ava.config.js'

export default {
  ...avaConfig,
  // We need to use `process.chdir()` in tests
  workerThreads: false,
}
