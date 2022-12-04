<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ehmicky/design/main/get-bin-path/get-bin-path_dark.svg"/>
  <img alt="get-bin-path logo" src="https://raw.githubusercontent.com/ehmicky/design/main/get-bin-path/get-bin-path.svg" width="500"/>
</picture>

[![Node](https://img.shields.io/badge/-Node.js-808080?logo=node.js&colorA=404040&logoColor=66cc33)](https://www.npmjs.com/package/get-bin-path)
[![TypeScript](https://img.shields.io/badge/-Typed-808080?logo=typescript&colorA=404040&logoColor=0096ff)](/src/main.d.ts)
[![Codecov](https://img.shields.io/badge/-Tested%20100%25-808080?logo=codecov&colorA=404040)](https://codecov.io/gh/ehmicky/get-bin-path)
[![Mastodon](https://img.shields.io/badge/-Mastodon-808080.svg?logo=mastodon&colorA=404040&logoColor=9590F9)](https://fosstodon.org/@ehmicky)
[![Medium](https://img.shields.io/badge/-Medium-808080.svg?logo=medium&colorA=404040)](https://medium.com/@ehmicky)

Get the current package's binary path (using the `package.json`
[`bin`](https://docs.npmjs.com/files/package.json#bin) or
[`directories.bin`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#directoriesbin)
field).

This is useful when testing a package's binary. Using `get-bin-path` (as opposed
to hard-coding the path to the binary):

- validates that the `package.json` `bin` or `directories.bin` field is
  correctly setup
- decouples the binary path from the tests, which allows moving the file without
  rewriting the tests

# Examples

```js
import { getBinPath } from 'get-bin-path'

// `binPath` is the absolute path to the current package's binary
const binPath = await getBinPath()
```

```js
// Test runner
import test from 'ava'
// Library to execute child processes / commands
import { execa } from 'execa'
import { getBinPath } from 'get-bin-path'

const binPath = await getBinPath()

test('Binary file should return "true"', async (t) => {
  const { stdout } = await execa(binPath)
  t.is(stdout, 'true')
})
```

# Install

```
npm install get-bin-path
```

This package works in Node.js >=14.18.0. It is an ES module and must be loaded
using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# API

## getBinPath(options?)

[`options`](#options): `object`\
_Returns_: `Promise<string | undefined>`

Returns the current package's binary absolute path. When no `package.json` or
binary can be found, `undefined` is returned instead.

```js
import { getBinPath } from 'get-bin-path'

const binPath = await getBinPath()
```

## getBinPathSync(options?)

[`options`](#options): `object`\
_Returns_: `string | undefined`

Same but synchronous.

```js
import { getBinPathSync } from 'get-bin-path'

const binPath = getBinPathSync()
```

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

# See also

- [`execa`](https://github.com/sindresorhus/execa): process execution for humans

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

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
  <tbody>
    <tr>
      <td align="center"><a href="https://fosstodon.org/@ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4?s=100" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/get-bin-path/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/get-bin-path/commits?author=ehmicky" title="Documentation">📖</a></td>
      <td align="center"><a href="http://evocateur.org/"><img src="https://avatars3.githubusercontent.com/u/5605?v=4?s=100" width="100px;" alt="Daniel Stockman"/><br /><sub><b>Daniel Stockman</b></sub></a><br /><a href="https://github.com/ehmicky/get-bin-path/commits?author=evocateur" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/kabirbaidhya"><img src="https://avatars1.githubusercontent.com/u/3315763?v=4?s=100" width="100px;" alt="Kabir Baidhya"/><br /><sub><b>Kabir Baidhya</b></sub></a><br /><a href="https://github.com/ehmicky/get-bin-path/commits?author=kabirbaidhya" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/NMinhNguyen"><img src="https://avatars.githubusercontent.com/u/2852660?v=4?s=100" width="100px;" alt="Minh Nguyen"/><br /><sub><b>Minh Nguyen</b></sub></a><br /><a href="#ideas-NMinhNguyen" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://github.com/tmillr"><img src="https://avatars.githubusercontent.com/u/45028928?v=4?s=100" width="100px;" alt="Tyler Miller"/><br /><sub><b>Tyler Miller</b></sub></a><br /><a href="#ideas-tmillr" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
