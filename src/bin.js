import { resolve } from 'node:path'

// Look for `package.json` `bin` field.
// It can be either a `string` or an `object`.
export const getBinField = ({ packageBin, rootDir, name, packageName }) => {
  const binField = getRelativeBinField(packageBin, name, packageName)
  return binField === undefined ? undefined : resolve(rootDir, binField)
}

const getRelativeBinField = (packageBin, name, packageName) => {
  if (typeof packageBin === 'string') {
    return getStringBinField(packageBin, name, packageName)
  }

  if (typeof packageBin === 'object') {
    return getObjectBinField(packageBin, name, packageName)
  }
}

const getStringBinField = (packageBin, name, packageName) =>
  name === undefined || name === packageName ? packageBin : undefined

const getObjectBinField = (packageBin, name, packageName) => {
  if (name !== undefined) {
    return packageBin[name]
  }

  const paths = Object.keys(packageBin)
  return paths.length === 1 ? packageBin[paths[0]] : packageBin[packageName]
}
