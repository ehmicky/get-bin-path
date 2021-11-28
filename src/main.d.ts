/**
 * Options for the getBinPath() function.
 */
export interface BinaryOptions {
  /**
   * Name of the binary. Only needs to be specified when the package exports several binaries.
   *
   * @default `package.json` `name` property
   * @type {string}
   */
  name?: string

  /**
   * Override the current directory, which is used when retrieving the `package.json`.
   *
   * @default Current directory
   * @type {string}
   */
  cwd?: string
}

/**
 * Get the current package's binary path.
 *
 * @param {BinaryOptions} [options={}]        Additional options for the binary.
 * @returns {(Promise<string | undefined>)}
 *  Returns the binary absolute path and returns `undefined` if it could not be found.
 *
 * @example
 *  const binaryPath = await getBinPath()
 */
export function getBinPath(options?: BinaryOptions): Promise<string | undefined>

/**
 * Get the current package's binary path synchronously.
 *
 * @param {BinaryOptions} [options={}]        Additional options for the binary.
 * @returns {string | undefined}
 *  Returns the binary absolute path and returns `undefined` if it could not be found.
 *
 * @example
 *  const binaryPath = getBinPathSync()
 */
export function getBinPathSync(options?: BinaryOptions): string | undefined
