import Showdown from 'showdown'
import './prism'
import linkHead from './link-head-hash'
import theme from './theme.scss'

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
      codeTheme: 'light', // or dark
      ...option
    }

    if (opts.codeTheme === 'light') {
      require('prismjs/themes/prism.css')
    } else {
      require('prismjs/themes/prism-twilight.css')
    }
    _p.md = new Showdown.Converter(opts)
    this.opts = opts
  }

  toHTML(markdownSyntax) {
    const { md } = _private.get(this)
    const { opts } = this

    let html = md.makeHtml(markdownSyntax)

    if (opts.hasHeadHash) {
      html = linkHead(html)
    }

    return `<div class="mark-it-down ${theme[opts.theme]}">${html}</div>`
  }

}

module.exports = Markdown
