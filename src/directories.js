import { readdirSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'

// Look for `package.json` `directories.bin` field.
// It points to a directory with binaries.
export const getDirField = async function ({ directories, rootDir, name }) {
  const binDir = getBinDir(directories, rootDir)

  if (binDir === undefined) {
    return
  }

  try {
    const paths = await readdir(binDir)
    return findDirField(paths, binDir, name)
  } catch {}
}

// Same but sync.
export const getDirFieldSync = function ({ directories, rootDir, name }) {
  const binDir = getBinDir(directories, rootDir)

  if (binDir === undefined) {
    return
  }

  try {
    const paths = readdirSync(binDir)
    return findDirField(paths, binDir, name)
  } catch {}
}

const getBinDir = function (directories, rootDir) {
  return typeof directories?.bin === 'string'
    ? resolve(rootDir, directories.bin)
    : undefined
}

const findDirField = function (paths, binDir, name) {
  const dirField = paths.includes(name) ? name : paths[0]
  return dirField === undefined ? undefined : resolve(binDir, dirField)
}
