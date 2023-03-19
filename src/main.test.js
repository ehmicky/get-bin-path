import { mkdir } from 'node:fs/promises'
import { relative } from 'node:path'
import { cwd as getCwd, chdir } from 'node:process'
import { fileURLToPath } from 'node:url'

import test from 'ava'
import { packageDirectorySync } from 'pkg-dir'
import { each } from 'test-each'

import { getBinPath, getBinPathSync } from 'get-bin-path'

const ROOT_DIR = packageDirectorySync({})
const FIXTURES_DIR = fileURLToPath(new URL('fixtures', import.meta.url))

const normalizePath = (binPath) =>
  relative(ROOT_DIR, binPath).replace(/\\/gu, '/')

each(
  [getBinPath, getBinPathSync],
  [
    // No `package.json`
    [undefined, undefined, undefined],

    // No `bin` nor `directories`
    [undefined, 'none', undefined],

    // Invalid `bin`
    [undefined, 'boolean', undefined],

    // String `bin`
    [undefined, 'string', 'bin/test.js'],
    ['test', 'string', 'bin/test.js'],
    ['unknown', 'string', 'bin/test.js'],

    // Object `bin` with single entry
    [undefined, 'simple', 'bin/test.js'],
    ['test', 'simple', 'bin/test.js'],
    ['unknown', 'simple', undefined],

    // Object `bin` with multiple entries
    [undefined, 'multiple', 'bin/test.js'],
    ['test', 'multiple', 'bin/test.js'],
    ['other', 'multiple', 'bin/other.js'],
    ['unknown', 'multiple', undefined],

    // `directories` present but not `directories.bin`
    [undefined, 'dir_undefined', undefined],

    // `directories.bin` not a string
    [undefined, 'dir_boolean', undefined],

    // `directories.bin` pointing to missing directory
    [undefined, 'dir_missing', undefined],

    // `directories.bin` with single entry
    [undefined, 'dir_simple', 'bin/test'],
    ['test', 'dir_simple', 'bin/test'],
    ['unknown', 'dir_simple', undefined],

    // `directories.bin` with multiple entries, including one with same name
    [undefined, 'dir_multiple', 'bin/test'],
    ['test', 'dir_multiple', 'bin/test'],
    ['other', 'dir_multiple', 'bin/other'],
    ['unknown', 'dir_multiple', undefined],

    // `directories.bin` with multiple entries, but none with same name
    [undefined, 'dir_different', undefined],
    ['test', 'dir_different', 'bin/test'],
    ['unknown', 'dir_different', undefined],

    // Both `bin` and `directories.bin`
    [undefined, 'dir_both', 'bin/other.js'],
  ],
  ({ title }, getBinFunc, [name, fixtureName, result]) => {
    test(`Main tests | ${title}`, async (t) => {
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
  test.serial(`No options | ${title}`, async (t) => {
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

  test(`Empty directory | ${title}`, async (t) => {
    const cwd = `${FIXTURES_DIR}/dir_empty`
    await mkdir(`${cwd}/bin`, { recursive: true })
    t.is(await getBinFunc({ cwd }), undefined)
  })
})
