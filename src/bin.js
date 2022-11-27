import { resolve } from 'node:path'

// `bin` field can either be a `string` or an `object`
export const getAbsoluteBinField = function (packageBin, rootDir, name) {
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
