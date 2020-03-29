/**
 * Options for the getBinPath() function.
 */
export interface BinaryOptions {
  name?: string;
  cwd?: string;
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
export declare function getBinPath(options?: BinaryOptions): Promise<string | undefined>;

/**
 * Get the current package's binary path synchronously.
 *
 * @param {BinaryOptions} [options={}]        Additional options for the binary.
 * @returns {(Promise<string | undefined>)}
 *  Returns the binary absolute path and returns `undefined` if it could not be found.
 *
 * @example
 *  const binaryPath = getBinPathSync()
 */
export declare function getBinPathSync(options?: BinaryOptions): string | undefined;
