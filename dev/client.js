import Markdown from '../src'

const lightMD = new Markdown({

})
const darkMD = new Markdown({
  theme: 'dark',
  codeTheme: 'dark',
})
const markdownSyntax = require('../README.md') + require('./doc.md')

const body = document.body
const _lightText = body.querySelector('#light-theme textarea')
const _darkText = body.querySelector('#dark-theme textarea')

setTimeout(()=> {
  _lightText.value = (markdownSyntax)
  _darkText.value = (markdownSyntax)

  lightMD.mountToTextArea(_lightText)
  darkMD.mountToTextArea(_darkText)
})

