import { cwd as getCwd, chdir } from 'process'

import test from 'ava'
import testEach from 'test-each'

import { getBinPath, getBinPathSync } from '../src/main.js'

import { normalizeBinPath } from './helpers/normalize.js'

const PACKAGES_DIR = `${__dirname}/helpers/packages`

testEach(
  [{ getBinFunc: getBinPath }, { getBinFunc: getBinPathSync }],
  [
    // No `package.json`
    [undefined, '/'],

    // Invalid `bin` fields
    [undefined, 'boolean'],
    [undefined, 'none'],

    // Invalid `name`
    ['invalid', 'string'],
    ['invalid', 'object'],

    // Using default `name`
    [undefined, 'string'],
    [undefined, 'object'],

    // Valid input when `bin` is string or object
    ['test', 'string'],
    ['test', 'object'],
  ],
  ({ title }, { getBinFunc }, [name, cwd]) => {
    test(`main tests | ${title}`, async t => {
      const cwdA = cwd === '/' ? cwd : `${PACKAGES_DIR}/${cwd}`
      const binPath = await getBinFunc(name, { cwd: cwdA })
      const normalizedPath = await normalizeBinPath(binPath)

      t.snapshot(normalizedPath)
    })
  },
)

testEach(
  [{ getBinFunc: getBinPath }, { getBinFunc: getBinPathSync }],
  ({ title }, { getBinFunc }) => {
    // This needs to run serially because we change the global `cwd`
    test.serial(`no options | ${title}`, async t => {
      const currentDir = getCwd()
      chdir(`${PACKAGES_DIR}/string`)

      const binPath = await getBinFunc()
      const normalizedPath = await normalizeBinPath(binPath)

      chdir(currentDir)

      t.snapshot(normalizedPath)
    })
  },
)
