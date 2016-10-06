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
      codeTheme: 'light', // or dark
      ...option
    }
    _p.md = new Showdown.Converter(opts)
    this.opts = opts
  }

  mountToTextArea(textarea) {
    const { opts } = this
    const themeClass = s[opts.theme] || ''
    const codeThemeClass = s[`code-${opts.codeTheme}`] || ''

    let textareas
    if (typeof textarea === 'string') {
      textareas = Array.from(document.querySelectorAll(textarea))
    } else {
      textareas = [textarea]
    }

    textareas.forEach((textarea)=> {
      const markdownDiv = document.createElement('div')

      markdownDiv.classList.add('mark-it-down')

      if (themeClass) {
        markdownDiv.classList.add(themeClass)
      }

      if (codeThemeClass) {
        markdownDiv.classList.add(codeThemeClass)
      }

      markdownDiv.innerHTML = this.toHTML(textarea.value)

      textarea.parentNode.replaceChild(markdownDiv, textarea)

      Array.from(markdownDiv.querySelectorAll('pre > code')).forEach((code)=> {
        Prism.highlightElement(code)
      })
    })
  }

  toHTML(markdownSyntax) {
    const { md } = _private.get(this)
    const { opts } = this
    // const themeClass = s[opts.theme] || ''
    // const codeThemeClass = s[`code-${opts.codeTheme}`] || ''

    let html = md.makeHtml(markdownSyntax)

    if (opts.hasHeadHash) {
      html = linkHead(html)
    }

    // html = html.replace(/<pre><code[^>]*>(((?!<\/code><\/pre>)[\s\S])*)<\/code><\/pre>/g, (m, m1)=> {
    //   const type = m.match(/<code class="(\S*)/)[1]
    //   const code = Prism.highlight(m1.trim(), Prism.languages[typeMap(type)])
    //     .replace(/\&lt;/g, '<')
    //     .replace(/\&gt;/g, '>')
    //
    //   return m.replace(m1, code)
    // })

    return html
  }

}

module.exports = Markdown
