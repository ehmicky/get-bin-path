/**
 * `get-bin-path` options
 */
export type BinaryOptions = Partial<{
  /**
   * Name of the binary.
   *
   * Only needs to be specified when the package exports several binaries in the
   * `package.json`
   * [`bin`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#bin) or
   * [`directories.bin`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#directoriesbin)
   * field.
   *
   * When the `package.json`'s `bin` or `directories.bin` field is a `string`,
   * the package
   * [`name` field](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#name)
   * must match the `name` option.
   *
   * @default `package.json` `name` property
   *
   * @example
   * ```json
   * {
   *   "name": "foo",
   *   "bin": {
   *     "foo": "path/to/foo.js",
   *     "bar": "path/to/bar.js"
   *   }
   * }
   * ```
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
 * [`bin`](https://docs.npmjs.com/files/package.json#bin) or
 * [`directories.bin`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#directoriesbin)
 * field).
 *
 * @example
 * ```js
 * const binPath = await getBinPath()
 * ```
 */
export function getBinPath(options?: BinaryOptions): Promise<string | undefined>

/**
 * Get the current package's binary path (using the `package.json`
 * [`bin`](https://docs.npmjs.com/files/package.json#bin) or
 * [`directories.bin`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#directoriesbin)
 * field).
 *
 * @example
 * ```js
 * const binPath = getBinPathSync()
 * ```
 */
export function getBinPathSync(options?: BinaryOptions): string | undefined
