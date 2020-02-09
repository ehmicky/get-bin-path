# 5.0.1

## Dependencies

- Remove `core-js` dependency

# 5.0.0

## Breaking changes

- Minimal supported Node.js version is now `10.17.0`

# 4.0.0

## Breaking changes

- The `name` argument must now be specified as an
  [option](https://github.com/ehmicky/get-bin-path/blob/master/README.md#optionsname)
  instead. For example `getBinPath(name, { cwd })` is now
  `getBinPath({ name, cwd })`.

# 3.0.0

## Features

- When the `package.json` `bin` field is an object with a single property (such
  as `{ "bin": { "mylib": "./path/to/bin.js" } }`), it is not longer necessary
  to specify the binary `name`.
