import { relative } from 'node:path'
import { cwd as getCwd, chdir } from 'node:process'
import { fileURLToPath } from 'node:url'

import test from 'ava'
import { getBinPath, getBinPathSync } from 'get-bin-path'
import { packageDirectory } from 'pkg-dir'
import { each } from 'test-each'

const FIXTURES_DIR = fileURLToPath(new URL('fixtures', import.meta.url))
const ROOT_DIR = packageDirectory({})

const normalizeBinPath = async function (binPath) {
  if (typeof binPath !== 'string') {
    return binPath
  }

  const rootDir = await ROOT_DIR
  return relative(rootDir, binPath).replace(/\\/gu, '/')
}

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
      const cwdA = cwd === '/' ? cwd : `${FIXTURES_DIR}/${cwd}`
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
    chdir(`${FIXTURES_DIR}/string`)

    const binPath = await getBinFunc()
    const normalizedPath = await normalizeBinPath(binPath)

    chdir(currentDir)

    t.snapshot(normalizedPath)
  })
})
