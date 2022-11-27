import { relative } from 'node:path'
import { cwd as getCwd, chdir } from 'node:process'
import { fileURLToPath } from 'node:url'

import test from 'ava'
import { getBinPath, getBinPathSync } from 'get-bin-path'
import { packageDirectorySync } from 'pkg-dir'
import { each } from 'test-each'

const ROOT_DIR = packageDirectorySync({})
const FIXTURES_DIR = fileURLToPath(new URL('fixtures', import.meta.url))

const normalizePath = function (binPath) {
  return relative(ROOT_DIR, binPath).replace(/\\/gu, '/')
}

each(
  [getBinPath, getBinPathSync],
  [
    // No `package.json`
    [undefined, undefined, undefined],

    // Invalid `bin` fields
    [undefined, 'boolean', undefined],
    [undefined, 'none', undefined],

    // Invalid `name`
    ['invalid', 'object'],

    // Using default `name`
    [undefined, 'string', 'bin/test.js'],
    ['anything', 'string', 'bin/test.js'],
    [undefined, 'object', 'bin/test-object.js'],

    // Valid input when `bin` is string or object
    ['test', 'string', 'bin/test.js'],
    ['test', 'object', 'bin/test.js'],
    [undefined, 'simple', 'bin/test.js'],
    ['test', 'simple', 'bin/test.js'],
  ],
  ({ title }, getBinFunc, [name, fixtureName, result]) => {
    test(`main tests | ${title}`, async (t) => {
      const cwd =
        fixtureName === undefined ? '/' : `${FIXTURES_DIR}/${fixtureName}`
      const binPath = await getBinFunc({ name, cwd })

      if (binPath === undefined) {
        t.is(result, undefined)
      } else {
        t.is(
          normalizePath(binPath),
          `${normalizePath(FIXTURES_DIR)}/${fixtureName}/${result}`,
        )
      }
    })
  },
)

each([getBinPath, getBinPathSync], ({ title }, getBinFunc) => {
  // This needs to run serially because we change the global `cwd`
  test.serial(`no options | ${title}`, async (t) => {
    const currentDir = getCwd()
    const fixtureName = 'string'
    chdir(`${FIXTURES_DIR}/${fixtureName}`)
    const binPath = await getBinFunc()
    chdir(currentDir)

    t.is(
      normalizePath(binPath),
      `${normalizePath(FIXTURES_DIR)}/${fixtureName}/bin/test.js`,
    )
  })
})
