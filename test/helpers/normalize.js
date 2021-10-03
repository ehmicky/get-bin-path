import { relative } from 'path'

import { packageDirectory } from 'pkg-dir'

const ROOT_DIR = packageDirectory({})

export const normalizeBinPath = async function (binPath) {
  if (typeof binPath !== 'string') {
    return binPath
  }

  const rootDir = await ROOT_DIR
  return relative(rootDir, binPath).replace(/\\/gu, '/')
}
