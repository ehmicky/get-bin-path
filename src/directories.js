import { readdirSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'

// Look for `package.json` `directories.bin` field.
// It points to a directory with binaries.
export const getDirField = async ({
  directories,
  rootDir,
  name,
  packageName,
}) => {
  const binDir = getBinDir(directories, rootDir)

  if (binDir === undefined) {
    return
  }

  try {
    const paths = await readdir(binDir)
    return findDirField({ paths, binDir, name, packageName })
  } catch {}
}

// Same but sync.
export const getDirFieldSync = ({
  directories,
  rootDir,
  name,
  packageName,
}) => {
  const binDir = getBinDir(directories, rootDir)

  if (binDir === undefined) {
    return
  }

  try {
    const paths = readdirSync(binDir)
    return findDirField({ paths, binDir, name, packageName })
  } catch {}
}

const getBinDir = (directories, rootDir) =>
  typeof directories?.bin === 'string'
    ? resolve(rootDir, directories.bin)
    : undefined

const findDirField = ({ paths, binDir, name, packageName }) => {
  const dirField = getDirFieldValue(paths, name, packageName)
  return paths.includes(dirField) ? resolve(binDir, dirField) : undefined
}

const getDirFieldValue = (paths, name, packageName) => {
  if (name !== undefined) {
    return name
  }

  return paths.length === 1 ? paths[0] : packageName
}
