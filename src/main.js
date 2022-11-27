import { readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { dirname } from 'node:path'

import escalade from 'escalade'
// eslint-disable-next-line n/file-extension-in-import
import escaladeSync from 'escalade/sync'

import { getAbsoluteBinField } from './bin.js'
import { getDirField, getDirFieldSync } from './directories.js'

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
  const {
    packageBin,
    directories,
    rootDir,
    name: nameA,
  } = parsePackageJson(packageJsonPath, packageJsonContents, name)
  const binField = getAbsoluteBinField(packageBin, rootDir, nameA)
  return binField === undefined
    ? await getDirField(directories, rootDir, nameA)
    : binField
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
  const {
    packageBin,
    directories,
    rootDir,
    name: nameA,
  } = parsePackageJson(packageJsonPath, packageJsonContents, name)
  const binField = getAbsoluteBinField(packageBin, rootDir, nameA)
  return binField === undefined
    ? getDirFieldSync(directories, rootDir, nameA)
    : binField
}

const normalizeOpts = function ({ name, cwd = '.' } = {}) {
  return { name, cwd }
}

const findPackageJson = function (_, filenames) {
  return filenames.find(isPackageJson)
}

const isPackageJson = function (filename) {
  return filename === 'package.json'
}

const parsePackageJson = function (packageJsonPath, packageJsonContents, name) {
  const {
    name: packageName,
    bin: packageBin,
    directories,
  } = JSON.parse(packageJsonContents)
  const rootDir = dirname(packageJsonPath)
  return { packageBin, directories, rootDir, name: name ?? packageName }
}
