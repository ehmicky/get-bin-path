export type BinaryOptions = Partial<{
  /**
   * Name of the binary. Only needs to be specified when the package exports
   * several binaries.
   *
   * @default `package.json` `name` property
   */
  name: string

  /**
   * Override the current directory, which is used when retrieving the
   * `package.json`.
   *
   * @default "."
   */
  cwd: string
}>

/**
 * Get the current package's binary path (using the `package.json`
 * [`bin` field](https://docs.npmjs.com/files/package.json#bin)).
 *
 * @example
 * ```js
 * const binPath = await getBinPath()
 * ```
 */
export function getBinPath(options?: BinaryOptions): Promise<string | undefined>

/**
 * Get the current package's binary path (using the `package.json`
 * [`bin` field](https://docs.npmjs.com/files/package.json#bin)).
 *
 * @example
 * ```js
 * const binPath = getBinPathSync()
 * ```
 */
export function getBinPathSync(options?: BinaryOptions): string | undefined
