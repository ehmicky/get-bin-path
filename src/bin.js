import { resolve } from 'node:path'

// Look for `package.json` `bin` field.
// It can be either a `string` or an `object`.
export const getBinField = ({ packageBin, rootDir, name }) => {
  const binField = getRelativeBinField(packageBin, name)
  return binField === undefined ? undefined : resolve(rootDir, binField)
}

const getRelativeBinField = (packageBin, name) => {
  if (isInvalidBin(packageBin)) {
    return
  }

  if (typeof packageBin === 'string') {
    return packageBin
  }

  const paths = Object.keys(packageBin)
  return paths.length === 1 ? packageBin[paths[0]] : packageBin[name]
}

const isInvalidBin = (packageBin) =>
  typeof packageBin !== 'string' && typeof packageBin !== 'object'
