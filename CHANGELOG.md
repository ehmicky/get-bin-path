# 7.3.0

## Features

- Reduce package size
- Improve performance

# 7.2.1

## Bug fixes

- Fix `package.json`

# 7.2.0

## Features

- Improve tree-shaking support

# 7.1.0

## Features

- Reduce npm package size

# 7.0.0

## Breaking changes

- Minimal supported Node.js version is now `14.18.0`

# 6.1.0

## Features

- Improve TypeScript types

# 6.0.1

## Bug fixes

- Fix `main` field in `package.json`

# 6.0.0

## Breaking changes

- Minimal supported Node.js version is now `12.20.0`
- This package is now an ES module. It can only be loaded with an `import` or
  `import()` statement, not `require()`. See
  [this post for more information](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

# 5.1.0

## Features

- Add TypeScript types

# 5.0.1

## Dependencies

- Remove `core-js` dependency

# 5.0.0

## Breaking changes

- Minimal supported Node.js version is now `10.17.0`

# 4.0.1 (backport)

## Dependencies

- Remove `core-js` dependency

# 4.0.0

## Breaking changes

- The `name` argument must now be specified as an
  [option](https://github.com/ehmicky/get-bin-path/blob/main/README.md#optionsname)
  instead. For example `getBinPath(name, { cwd })` is now
  `getBinPath({ name, cwd })`.

# 3.0.0

## Features

- When the `package.json` `bin` field is an object with a single property (such
  as `{ "bin": { "mylib": "./path/to/bin.js" } }`), it is not longer necessary
  to specify the binary `name`.
