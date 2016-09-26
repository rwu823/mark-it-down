import Markdown from '../src'

const lightMD = new Markdown({

})
const darkMD = new Markdown({
  theme: 'dark',
  codeTheme: 'dark',
})
const markdownSyntax = require('../README.md') + require('./doc.md')

const body = document.body

body.querySelector('#light-theme').innerHTML = lightMD.toHTML(markdownSyntax)
body.querySelector('#dark-theme').innerHTML = darkMD.toHTML(markdownSyntax)

