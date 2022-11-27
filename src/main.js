import { readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import escalade from 'escalade'
// eslint-disable-next-line n/file-extension-in-import
import escaladeSync from 'escalade/sync'

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
export const getBinPath = async function (opts) {
  const { name, cwd } = normalizeOpts(opts)
  const packageJsonPath = await escalade(cwd, findPackageJson)

  // `package.json` not found
  if (packageJsonPath === undefined) {
    return
  }

  const packageJsonContents = await readFile(packageJsonPath)
  return getBinaryPath(packageJsonPath, packageJsonContents, name)
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
export const getBinPathSync = function (opts) {
  const { name, cwd } = normalizeOpts(opts)
  const packageJsonPath = escaladeSync(cwd, findPackageJson)

  if (packageJsonPath === undefined) {
    return
  }

  const packageJsonContents = readFileSync(packageJsonPath)
  return getBinaryPath(packageJsonPath, packageJsonContents, name)
}

const normalizeOpts = function ({ name, cwd = '.' } = {}) {
  return { name, cwd }
}

const findPackageJson = function (dirname, filenames) {
  return filenames.find(isPackageJson)
}

const isPackageJson = function (filename) {
  return filename === 'package.json'
}

const getBinaryPath = function (packageJsonPath, packageJsonContents, name) {
  const { bin: packageBin, name: packageName } = JSON.parse(packageJsonContents)
  const relativePath = getRelativePath(packageBin, packageName, name)

  // Binary not found in `package.json`
  if (relativePath === undefined) {
    return
  }

  return resolve(packageJsonPath, '..', relativePath)
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
  return keys.length === 1 ? packageBin[keys[0]] : packageBin[name]
}

const isInvalidBin = function (packageBin) {
  return (
    packageBin === undefined ||
    (typeof packageBin !== 'string' && typeof packageBin !== 'object')
  )
}
