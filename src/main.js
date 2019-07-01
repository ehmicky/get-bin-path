import { resolve } from 'path'

import readPkgUp from 'read-pkg-up'

import { isPlainObject } from './utils.js'

export const getBinPath = async function(name, { cwd } = {}) {
  // We don't use `normalize` because we don't really need it, so it's faster
  // and it removes a dependency
  const packageResult = await readPkgUp({ cwd, normalize: false })
  return getBinaryPath(packageResult, name)
}

export const getBinPathSync = function(name, { cwd } = {}) {
  const packageResult = readPkgUp.sync({ cwd, normalize: false })
  return getBinaryPath(packageResult, name)
}

const getBinaryPath = function(packageResult, name) {
  // No `package.json` found
  if (packageResult === undefined) {
    return
  }

  const {
    package: { bin: packageBin, name: packageName },
    path: packagePath,
  } = packageResult

  const binaries = getBinaries(packageBin, packageName)
  const relativePath = getRelativePath(binaries, packageName, name)

  // Binary not found in `package.json`
  if (relativePath === undefined) {
    return
  }

  const absolutePath = resolve(packagePath, '..', relativePath)
  return absolutePath
}

// `bin` field can either be a `string` or an `object`
const getBinaries = function(packageBin, packageName) {
  if (packageBin === undefined) {
    return {}
  }

  if (typeof packageBin === 'string') {
    return { [packageName]: packageBin }
  }

  if (!isPlainObject(packageBin)) {
    return {}
  }

  return packageBin
}

const getRelativePath = function(binaries, packageName, name = packageName) {
  return binaries[name]
}
