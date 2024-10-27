import avaConfig from '@ehmicky/dev-tasks/ava.config.js'

export default {
  ...avaConfig,
  // Needed to be able to use `process.chdir()` in tests
  workerThreads: false,
}
