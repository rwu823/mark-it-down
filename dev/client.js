import Markdown from '../src'

const md = new Markdown({})
const html = md.toHTML(require('./test.md'))

// const link = document.createElement('link')
// link.rel = 'stylesheet'
// link.href = '//unpkg.com/prismjs@1.5.1/themes/prism.css'
//
document.body.innerHTML = html
// document.body.appendChild(link)
