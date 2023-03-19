import { readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { dirname } from 'node:path'

import escalade from 'escalade'
// eslint-disable-next-line n/file-extension-in-import
import escaladeSync from 'escalade/sync'

import { getBinField } from './bin.js'
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
export const getBinPath = async (opts) => {
  const { name, cwd } = normalizeOpts(opts)
  const packageJsonPath = await escalade(cwd, findPackageJson)

  if (packageJsonPath === undefined) {
    return
  }

  const packageJsonContents = await readFile(packageJsonPath)
  const packageJsonFields = parsePackageJson(
    packageJsonPath,
    packageJsonContents,
    name,
  )
  const binField = getBinField(packageJsonFields)
  return binField === undefined
    ? await getDirField(packageJsonFields)
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
export const getBinPathSync = (opts) => {
  const { name, cwd } = normalizeOpts(opts)
  const packageJsonPath = escaladeSync(cwd, findPackageJson)

  if (packageJsonPath === undefined) {
    return
  }

  const packageJsonContents = readFileSync(packageJsonPath)
  const packageJsonFields = parsePackageJson(
    packageJsonPath,
    packageJsonContents,
    name,
  )
  const binField = getBinField(packageJsonFields)
  return binField === undefined ? getDirFieldSync(packageJsonFields) : binField
}

const normalizeOpts = ({ name, cwd = '.' } = {}) => ({ name, cwd })

const findPackageJson = (_, filenames) => filenames.find(isPackageJson)

const isPackageJson = (filename) => filename === 'package.json'

const parsePackageJson = (packageJsonPath, packageJsonContents, name) => {
  const {
    name: packageName,
    bin: packageBin,
    directories,
  } = JSON.parse(packageJsonContents)
  const rootDir = dirname(packageJsonPath)
  return { packageBin, directories, rootDir, name, packageName }
}
