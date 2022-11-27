import { readFileSync, readdirSync } from 'node:fs'
import { readFile, readdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'

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
  const {
    packageBin,
    directories,
    rootDir,
    name: nameA,
  } = parsePackageJson(packageJsonPath, packageJsonContents, name)
  const binField = getAbsoluteBinField(packageBin, rootDir, nameA)

  if (binField !== undefined) {
    return binField
  }

  return await getDirField(directories, rootDir, nameA)
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

  if (binField !== undefined) {
    return binField
  }

  return getDirFieldSync(directories, rootDir, nameA)
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

// `bin` field can either be a `string` or an `object`
const getAbsoluteBinField = function (packageBin, rootDir, name) {
  const binField = getBinField(packageBin, name)
  return binField === undefined ? undefined : resolve(rootDir, binField)
}

const getBinField = function (packageBin, name) {
  if (isInvalidBin(packageBin)) {
    return
  }

  if (typeof packageBin === 'string') {
    return packageBin
  }

  const paths = Object.keys(packageBin)
  return paths.length === 1 ? packageBin[paths[0]] : packageBin[name]
}

const isInvalidBin = function (packageBin) {
  return typeof packageBin !== 'string' && typeof packageBin !== 'object'
}

const getDirField = async function (directories, rootDir, name) {
  const absoluteBinDir = getAbsoluteBinDir(directories, rootDir)

  if (absoluteBinDir === undefined) {
    return
  }

  try {
    const paths = await readdir(absoluteBinDir)
    return findDirField(paths, absoluteBinDir, name)
  } catch {}
}

const getDirFieldSync = function (directories, rootDir, name) {
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
