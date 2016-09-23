<p align="center">
  <img width="100" src="https://raw.githubusercontent.com/rwu823/mark-it-down/master/assets/logo.png" />
</p>

<p align="center">  
  <a href="https://www.npmjs.com/package/mark-it-down">
    <img src="https://img.shields.io/npm/v/mark-it-down.svg?label=version" />
  </a>
  <a href="https://travis-ci.org/rwu823/mark-it-down" alt="Build Status">
    <img src="https://img.shields.io/travis/rwu823/mark-it-down.svg" />
  </a>
  <a href="https://coveralls.io/github/rwu823/mark-it-down" alt="Coverage">
    <img src="https://img.shields.io/coveralls/rwu823/mark-it-down.svg" />
  </a>
  <img src="https://img.shields.io/github/license/rwu823/mark-it-down.svg" />  
</p>


# mark-it-down
The modern Markdown parser, painless and all in one, your good friend of write documentation.


## Install

```sh
$ npm i --save mark-it-down
```

## Usage

```js
import Markdown from 'mark-it-down'
const md = new Markdown({})

const html = md.toHTML(markdownSyntax)
```

## Options

- `hasHeadHash`: _[Boolean]_ `true` or `false`, auto generation the hash link, the spaces will convert to `-` and transform to lower case

```js
const md = new Markdown({
  hasHeadHash: true
})
md.toHTML('## Browser Supported')

// outputs
<h2><a href="#browser-supported">Browser Supported</a><h2>
```

- `theme`: _[String]_ `light` or `dark`, the Markdown theme
- `codeTheme`: _[String]_ `light` or `dark`, the code snippet them

The other [valid options](https://github.com/showdownjs/showdown#valid-options)

### Default options

```js
constructor(option = {}) {    
  const opts = {
    hasHeadHash: true,
    noHeaderId: true,
    strikethrough: true,
    tables: true,
    tasklists: true,
    theme: 'light', // or dark
    codeTheme: 'light', // or dark
    ...option
  }
}
```

## API

### .toHTML(String)
Convert markdown syntax to HTML.
