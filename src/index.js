import Showdown from 'showdown'

import createStyleSheet from './create-stylesheet'
import './prism'
import linkHead from './link-head-hash'
import theme from './theme.scss'

const s = theme.locals || {}

createStyleSheet(theme.toString())

const _private = new WeakMap()
class Markdown {
  constructor(option = {}) {
    const _p = _private.set(this, {}).get(this)

    const opts = {
      hasHeadHash: true,
      noHeaderId: true,
      strikethrough: true,
      tables: true,
      tasklists: true,
      theme: 'light', // or dark
      codeTheme: 'dark', // or dark
      ...option
    }
    _p.md = new Showdown.Converter(opts)
    this.opts = opts
  }

  toHTML(markdownSyntax) {
    const { md } = _private.get(this)
    const { opts } = this
    const themeClass = opts.theme
    const codeThemeClass = `code-${opts.codeTheme}`

    let html = md.makeHtml(markdownSyntax)

    if (opts.hasHeadHash) {
      html = linkHead(html)
    }

    return `<div class="mark-it-down ${s[themeClass]} ${s[codeThemeClass]}">${html}</div>`
  }

}

module.exports = Markdown
