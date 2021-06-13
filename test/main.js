import { cwd as getCwd, chdir } from 'process'
import { fileURLToPath } from 'url'

import test from 'ava'
// eslint-disable-next-line import/no-unresolved, node/no-missing-import
import { getBinPath, getBinPathSync } from 'get-bin-path'
import { each } from 'test-each'

import { normalizeBinPath } from './helpers/normalize.js'

const PACKAGES_DIR = fileURLToPath(
  new URL('./helpers/packages', import.meta.url),
)

each(
  [getBinPath, getBinPathSync],
  [
    // No `package.json`
    [undefined, '/'],

    // Invalid `bin` fields
    [undefined, 'boolean'],
    [undefined, 'none'],

    // Invalid `name`
    ['invalid', 'object'],

    // Using default `name`
    [undefined, 'string'],
    ['anything', 'string'],
    [undefined, 'object'],

    // Valid input when `bin` is string or object
    ['test', 'string'],
    ['test', 'object'],
    [undefined, 'simple'],
    ['test', 'simple'],
  ],
  ({ title }, getBinFunc, [name, cwd]) => {
    test(`main tests | ${title}`, async (t) => {
      const cwdA = cwd === '/' ? cwd : `${PACKAGES_DIR}/${cwd}`
      const binPath = await getBinFunc({ name, cwd: cwdA })
      const normalizedPath = await normalizeBinPath(binPath)

      t.snapshot(normalizedPath)
    })
  },
)

each([getBinPath, getBinPathSync], ({ title }, getBinFunc) => {
  // This needs to run serially because we change the global `cwd`
  test.serial(`no options | ${title}`, async (t) => {
    const currentDir = getCwd()
    chdir(`${PACKAGES_DIR}/string`)

    const binPath = await getBinFunc()
    const normalizedPath = await normalizeBinPath(binPath)

    chdir(currentDir)

    t.snapshot(normalizedPath)
  })
})
