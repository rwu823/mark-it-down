import Markdown from '../'

let textarea

beforeEach(()=> {
  textarea = document.createElement('textarea')
  textarea.value = `
# Text Area

## Usage
\`\`\`js
import { Select } from 'vue-owl-ui'
\`\`\`
`

  document.body.appendChild(textarea)
})

afterEach(()=> {
  document.body.innerHTML = ''
})

it('convert to html with no `hasHeadHash`', ()=> {
  const md = new Markdown({
    hasHeadHash: false
  })
  const markdown = `# Install`

  expect(md.toHTML(markdown)).toMatch(`<h1>Install</h1>`)
})

it('convert to html with `hasHeadHash`', ()=> {
  const md = new Markdown({
    hasHeadHash: true
  })
  const markdown = `# Install`

  expect(md.toHTML(markdown)).toMatch(`<h1 id="install"><a href="#install">Install</a></h1>`)
})

it('convert to html with `code snippet`', ()=> {
  const md = new Markdown({})
  const code = `\`\`\`js
let x,
    y
\`\`\``

  expect(md.toHTML(code)).toMatch(`<code class="js language-js">`)
})

it('Test mount to textarea', ()=> {
  const md = new Markdown()

  md.mountToTextArea(textarea)

  expect(document.body.innerHTML).toMatch('<h1 id="text-area"><a href="#text-area">Text Area</a></h1>')
  expect(document.body.innerHTML).toMatch('<pre class=" language-js"><code class="js  language-js">')
})

it('Test mount to textarea as query selector', ()=> {
  const md = new Markdown()

  md.mountToTextArea('textarea')

  expect(document.body.innerHTML).toMatch('<h1 id="text-area"><a href="#text-area">Text Area</a></h1>')
  expect(document.body.innerHTML).toMatch('<pre class=" language-js"><code class="js  language-js">')
})


it(`Test mount to textarea as doesn't match selector`, ()=> {
  const md = new Markdown()

  md.mountToTextArea('xxx')

  expect(document.body.innerHTML).toBe('<textarea></textarea>')
})
