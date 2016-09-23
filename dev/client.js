import Markdown from '../src'

const md = new Markdown({})
const html = md.toHTML(require('./test.md'))

document.body.innerHTML = html
