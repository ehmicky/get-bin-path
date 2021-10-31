import { resolve } from 'path'

import isPlainObj from 'is-plain-obj'
import { readPackageUp, readPackageUpSync } from 'read-pkg-up'

/**
 * Get the current package's binary path.
 *
 * @async
 * @param {string} name - Binary name
 * @param {object} [options]
 * @param {string} [options.cwd="Current directory"] - Current directory
 * @returns {Promise<string | undefined>} binaryPath - Binary absolute path.
 * `undefined` if it could not be found.
 *
 * @example const binaryPath = await getBinPath()
 */
export const getBinPath = async function ({ name, cwd } = {}) {
  // We don't use `normalize` because we don't really need it, so it's faster
  // and it removes a dependency
  const packageResult = await readPackageUp({ cwd, normalize: false })
  return getBinaryPath(packageResult, name)
}

/**
 * Get the current package's binary path synchronously.
 *
 * @param {string} name - Binary name
 * @param {object} [options]
 * @param {string} [options.cwd="Current directory"] - Current directory
 * @returns {string | undefined} binaryPath - Binary absolute path.
 * `undefined` if it could not be found.
 *
 * @example const binaryPath = getBinPathSync()
 */
export const getBinPathSync = function ({ name, cwd } = {}) {
  const packageResult = readPackageUpSync({ cwd, normalize: false })
  return getBinaryPath(packageResult, name)
}

const getBinaryPath = function (packageResult, name) {
  // No `package.json` found
  if (packageResult === undefined) {
    return
  }

  const {
    packageJson: { bin: packageBin, name: packageName },
    path: packagePath,
  } = packageResult

  const relativePath = getRelativePath(packageBin, packageName, name)

  // Binary not found in `package.json`
  if (relativePath === undefined) {
    return
  }

  const absolutePath = resolve(packagePath, '..', relativePath)
  return absolutePath
}

// `bin` field can either be a `string` or an `object`
const getRelativePath = function (packageBin, packageName, name = packageName) {
  if (isInvalidBin(packageBin)) {
    return
  }

  if (typeof packageBin === 'string') {
    return packageBin
  }

  const keys = Object.keys(packageBin)

  if (keys.length === 1) {
    return packageBin[keys[0]]
  }

  return packageBin[name]
}

const isInvalidBin = function (packageBin) {
  return (
    packageBin === undefined ||
    (typeof packageBin !== 'string' && !isPlainObj(packageBin))
  )
}
