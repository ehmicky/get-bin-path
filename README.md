<img src="https://raw.githubusercontent.com/ehmicky/design/master/get-bin-path/get-bin-path.svg?sanitize=true" width="500"/>

[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/get-bin-path.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/get-bin-path)
[![Build](https://github.com/ehmicky/get-bin-path/workflows/Build/badge.svg)](https://github.com/ehmicky/get-bin-path/actions)
[![Node](https://img.shields.io/node/v/get-bin-path.svg?logo=node.js)](https://www.npmjs.com/package/get-bin-path)
[![Gitter](https://img.shields.io/gitter/room/ehmicky/get-bin-path.svg?logo=gitter)](https://gitter.im/ehmicky/get-bin-path)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-4cc61e.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-4cc61e.svg?logo=medium)](https://medium.com/@ehmicky)

Get the current package's binary path (using the `package.json`
[`bin` field](https://docs.npmjs.com/files/package.json#bin)).

This is useful when testing a package's binary. Using `get-bin-path` (as opposed
to hard-coding the path to the binary):

- validates that the `package.json` `bin` field is correctly setup.
- decouples the binary path from the tests, which allows moving the file without
  rewriting the tests.

# Examples

```js
const { getBinPathSync } = require('get-bin-path')

// `binPath` is the absolute path to the current package's binary
const binPath = getBinPathSync()
```

```js
// Test runner
const test = require('ava')
// Library to execute child processes / commands
const execa = require('execa')
const { getBinPath } = require('get-bin-path')

test('Binary file should return "true"', async (t) => {
  const binPath = await getBinPath()
  const { stdout } = await execa.node(binPath)
  t.is(stdout, 'true')
})
```

# Install

```
npm install get-bin-path
```

# Usage

This returns the current package's binary absolute path:

```js
const { getBinPathSync } = require('get-bin-path')

const binPath = getBinPathSync()
```

This can be either synchronous or asynchronous:

```js
const { getBinPath } = require('get-bin-path')

const asyncFunc = async () => {
  const binPath = await getBinPath()
}
```

If there are several binaries, you can choose between them:

```js
const { getBinPathSync } = require('get-bin-path')

const binPath = getBinPathSync({ name: 'binary-name' })
```

The current directory can be overridden (for example with monorepos):

```js
const { getBinPathSync } = require('get-bin-path')

const binPath = getBinPathSync({ cwd: '/currentDirectory' })
```

When no `package.json` or binary can be found, `undefined` is returned instead.

## getBinPathSync(options?)

[`options`](#options): `object`\
_Returns_: `string | undefined`

## getBinPath(options?)

[`options`](#options): `object`\
_Returns_: `Promise<string | undefined>`

### options

_Type_: `object`

#### options.name

_Type_: `string`\
_Default_: `package.json` `name` property

Name of the binary. Only needs to be specified when the package exports several
binaries.

#### options.cwd

_Type_: `string`\
_Default_: Current directory

Override the current directory, which is used when retrieving the
`package.json`.

This is useful when using monorepos.

# See also

- [`execa`](https://github.com/sindresorhus/execa): process execution for humans

# Support

If you found a bug or would like a new feature, _don't hesitate_ to
[submit an issue on GitHub](../../issues).

For other questions, feel free to
[chat with us on Gitter](https://gitter.im/ehmicky/get-bin-path).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

Thanks go to our wonderful contributors:

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt=""/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/get-bin-path/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/get-bin-path/commits?author=ehmicky" title="Documentation">📖</a></td>
    <td align="center"><a href="http://evocateur.org/"><img src="https://avatars3.githubusercontent.com/u/5605?v=4" width="100px;" alt=""/><br /><sub><b>Daniel Stockman</b></sub></a><br /><a href="https://github.com/ehmicky/get-bin-path/commits?author=evocateur" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kabirbaidhya"><img src="https://avatars1.githubusercontent.com/u/3315763?v=4" width="100px;" alt=""/><br /><sub><b>Kabir Baidhya</b></sub></a><br /><a href="https://github.com/ehmicky/get-bin-path/commits?author=kabirbaidhya" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
