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
[`bin`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#bin) or
[`directories.bin`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#directoriesbin)
field).

This is useful when testing a package's binary. Using `get-bin-path` (as opposed
to hard-coding the path to the binary):

- validates that the `package.json` `bin` or `directories.bin` field is
  correctly setup
- decouples the binary path from the tests, which allows moving the file without
  rewriting the tests

# Hire me

Please
[reach out](https://www.linkedin.com/feed/update/urn:li:activity:7018596298127781890/)
if you're looking for a Node.js API or CLI engineer (10 years of experience).
Most recently I have been [Netlify Build](https://github.com/netlify/build)'s
and [Netlify Plugins](https://www.netlify.com/products/build/plugins/)'
technical lead for 2.5 years. I am available for full-time remote positions in
either US or EU time zones.

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

This package works in Node.js >=14.18.0.

This is an ES module. It must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`. If TypeScript is used, it must be configured to
[output ES modules](https://www.typescriptlang.org/docs/handbook/esm-node.html),
not CommonJS.

# API

## getBinPath(options?)

[`options`](#options): `object`\
_Returns_: `Promise<string | undefined>`

Returns the current package's binary absolute path. When no `package.json` or
binary can be found, `undefined` is returned instead.

Finding the binary follows similar rules to the [`npx` command](https://docs.npmjs.com/cli/v9/commands/npx?v=true#description). If there are multiple exported binaries and the `name` option is not set, one of the binaries' names must match the unscoped portion of the package's `name` field.

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
_Default_: `package.json` `name` field

Name of the binary. If set, the following lookup rules are used:

- If the package's `bin` or `directories.bin` field is a `string`, the specified `name` must match the unscoped portion of the `package.json` `name` field. Otherwise, `undefined` is returned.

  <details>
    <summary>Example</summary>

    ```json
    {
      "name": "example",
      "bin": "path/to/bin.js"
    }
    ```

    ```js
    const binPath = await getBinPath({name: 'example'})
    //=> 'path/to/bin.js'

    const binPath = await getBinPath({name: 'other'})
    //=> undefined
    ```
  </details>

- If the binary or binaries are exported by name, `undefined` is returned if none match the specified `name`.

  <details>
    <summary>Example</summary>

    ```json
    {
      "name": "foo",
      "bin": {
        "foo": "path/to/foo.js",
        "bar": "path/to/bar.js"
      }
    }
    ```

    ```js
    const binPath = await getBinPath({name: 'foo'})
    //=> 'path/to/foo.js'

    const binPath = await getBinPath({name: 'bar'})
    //=> 'path/to/bar.js'

    const binPath = await getBinPath({name: 'baz'})
    //=> undefined
    ```
  </details>

#### options.cwd

_Type_: `string`\
_Default_: Current directory

Override the current directory, which is used when retrieving the
`package.json`.

# See also

- [`bin-path-cli`](https://github.com/tommy-mitchell/bin-path-cli): execute the
  current package's binary
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
      <td align="center" valign="top" width="14.28%"><a href="https://fosstodon.org/@ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4?s=100" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/get-bin-path/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/get-bin-path/commits?author=ehmicky" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://evocateur.org/"><img src="https://avatars3.githubusercontent.com/u/5605?v=4?s=100" width="100px;" alt="Daniel Stockman"/><br /><sub><b>Daniel Stockman</b></sub></a><br /><a href="https://github.com/ehmicky/get-bin-path/commits?author=evocateur" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kabirbaidhya"><img src="https://avatars1.githubusercontent.com/u/3315763?v=4?s=100" width="100px;" alt="Kabir Baidhya"/><br /><sub><b>Kabir Baidhya</b></sub></a><br /><a href="https://github.com/ehmicky/get-bin-path/commits?author=kabirbaidhya" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/NMinhNguyen"><img src="https://avatars.githubusercontent.com/u/2852660?v=4?s=100" width="100px;" alt="Minh Nguyen"/><br /><sub><b>Minh Nguyen</b></sub></a><br /><a href="#ideas-NMinhNguyen" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tmillr"><img src="https://avatars.githubusercontent.com/u/45028928?v=4?s=100" width="100px;" alt="Tyler Miller"/><br /><sub><b>Tyler Miller</b></sub></a><br /><a href="#ideas-tmillr" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://tommymitchell.io"><img src="https://avatars.githubusercontent.com/u/1403701?v=4?s=100" width="100px;" alt="Tommy"/><br /><sub><b>Tommy</b></sub></a><br /><a href="#ideas-tommy-mitchell" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
