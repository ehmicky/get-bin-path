import { readdirSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'

export const getDirField = async function (directories, rootDir, name) {
  const absoluteBinDir = getAbsoluteBinDir(directories, rootDir)

  if (absoluteBinDir === undefined) {
    return
  }

  try {
    const paths = await readdir(absoluteBinDir)
    return findDirField(paths, absoluteBinDir, name)
  } catch {}
}

export const getDirFieldSync = function (directories, rootDir, name) {
  const absoluteBinDir = getAbsoluteBinDir(directories, rootDir)

  if (absoluteBinDir === undefined) {
    return
  }

  try {
    const paths = readdirSync(absoluteBinDir)
    return findDirField(paths, absoluteBinDir, name)
  } catch {}
}

const getAbsoluteBinDir = function (directories, rootDir) {
  return typeof directories?.bin === 'string'
    ? resolve(rootDir, directories.bin)
    : undefined
}

const findDirField = function (paths, absoluteBinDir, name) {
  const dirField = paths.includes(name) ? name : paths[0]
  return dirField === undefined ? undefined : resolve(absoluteBinDir, dirField)
}
