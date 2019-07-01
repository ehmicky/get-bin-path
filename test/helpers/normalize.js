import { relative, posix } from 'path'

import pkgDir from 'pkg-dir'

const ROOT_DIR = pkgDir()

export const normalizeBinPath = async function(binPath) {
  if (typeof binPath !== 'string') {
    return binPath
  }

  const rootDir = await ROOT_DIR
  return posix.normalize(relative(rootDir, binPath))
}
